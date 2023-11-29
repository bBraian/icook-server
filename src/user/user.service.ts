import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const emailTaken = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email }
    });

    if(emailTaken) {
      throw new NotFoundException({
        message: 'Email já utilizado',
        statusCode: 422,
      });
    }

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 5)
    }

    const createdUser = await this.prismaService.user.create({
      data: user
    })
    return {...createdUser, password: undefined};
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }
  
  async createUpdateTokenInDB(user: User, token: string) {
    const registerExist = await this.prismaService.userSession.findUnique({
      where: { user_id: user.id }
    })
    
    if(registerExist) {
      const res = await this.prismaService.$queryRaw`
        UPDATE user_session
        SET token = ${token}, expire_date = DATE_ADD(NOW(), INTERVAL 30 DAY)
        WHERE user_id = ${user.id}`;
    } else {
      const res = await this.prismaService.$queryRaw`
        INSERT INTO user_session (user_id, token, expire_date) 
        VALUES (${user.id}, ${token}, DATE_ADD(NOW(), INTERVAL 30 DAY)); `;
    }
  }

  async findAll() {
    const users: any = await this.prismaService.$queryRaw`
    SELECT u.name, u.avatar, u.id,
    (SELECT COUNT(id) FROM recipe WHERE user_id = u.id AND private = 0) AS recipe_amount,
    (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id IN (SELECT id FROM recipe WHERE user_id = u.id AND private = 0)) AS rating_sum,
    (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id IN (SELECT id FROM recipe WHERE user_id = u.id AND private = 0)) AS rating_count
    FROM user u`

    const parsedUsers = users.map(user => ({
      ...user,
      recipe_amount: Number(user.recipe_amount),
      rating_sum: Number(user.rating_sum),
      rating_count: Number(user.rating_count),
    }));

    return parsedUsers;
  }

  async findOne(id: number, token?: string) {
    const user: any = await this.prismaService.$queryRaw`
    SELECT u.name, u.avatar, u.description,
    IF((SELECT user_id FROM user_session WHERE token = ${token} AND user_id = ${id}) IS NULL, 0, 1) AS is_me
    FROM user u
    WHERE u.id = ${id}`;

    let userRecipes = [];
    let userSavedRecipes = [];
    if(Boolean(user[0].is_me)) {
      userRecipes = await this.prismaService.$queryRaw`SELECT r.*, 
      (SELECT COUNT(id) FROM recipe_ingredients WHERE r.id = recipe_id) AS ingredients_amount,
      (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
      (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum
      FROM recipe r
      WHERE r.user_id = ${id}`


      userSavedRecipes = await this.prismaService.$queryRaw`
      SELECT r.*,
      (SELECT COUNT(id) FROM recipe_ingredients WHERE r.id = recipe_id) AS ingredients_amount,
      (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
      (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum
      FROM user_saved_recipes sr
      INNER JOIN recipe r ON r.id = sr.recipe_id
      `
    } else {
      userRecipes = await this.prismaService.$queryRaw`SELECT r.*, 
      (SELECT COUNT(id) FROM recipe_ingredients WHERE r.id = recipe_id) AS ingredients_amount,
      (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
      (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum
      FROM recipe r
      WHERE r.user_id = ${id} AND r.private = 0`
    }

    const parsedRecipes = userRecipes.map(recipe => ({
      ...recipe,
      ingredients_amount: Number(recipe.ingredients_amount),
      review_amount: Number(recipe.review_amount),
      rating_sum: Number(recipe.rating_sum),
    }));

    const parsedSavedRecipes = userSavedRecipes.map(savedRecipe => ({
      ...savedRecipe,
      ingredients_amount: Number(savedRecipe.ingredients_amount),
      review_amount: Number(savedRecipe.review_amount),
      rating_sum: Number(savedRecipe.rating_sum),
    }));

    const parsedUser = {
      ...user[0],
      is_me: Boolean(user[0].is_me),
      recipes: parsedRecipes,
      saved_recipes: Boolean(user[0].is_me) ? parsedSavedRecipes : undefined
    };

    return parsedUser;
  }

  getUser(token: string) {
    return this.prismaService.$queryRaw`
    SELECT u.name, u.avatar
    FROM user_session us
    INNER JOIN user u ON u.id = us.user_id
    where us.token = ${token}`;
  }

  async update(id: number, updateUserDto: UpdateUserDto, token :string) {
    const canUpdate = await this.prismaService.$queryRaw`
    SELECT id
    FROM user_session
    WHERE token = ${token} AND user_id = ${id}`;

    console.log(canUpdate)
    if(!canUpdate[0]) {
      throw new UnauthorizedException('Sem permissão');
    }

    const updateUser = await this.prismaService.user.update({
      data: { 
        name: updateUserDto.name,
        description: updateUserDto.description
      },
      where: { id }
    })

    const userReturn = { name: updateUser.name, description: updateUser.description }

    return userReturn;
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: {id}
    })
  }

  async saveRecipe(recipeId: number, token: string) {
    const user = await this.prismaService.$queryRaw`
    SELECT id
    FROM user_session
    WHERE token = ${token}`;
    
    if(!user[0]) {
      throw new UnauthorizedException('Sem permissão');
    }

    const userId = user[0].id

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id: recipeId }
    });
    
    if(!recipe) {
      throw new NotFoundException('Receita não encontrada');
    }

    const saved_recipe = await this.prismaService.userSavedRecipes.create({
      data: { recipe_id: recipeId, user_id: userId }
    })

    return saved_recipe;
  }

  async unsaveRecipe(recipeId: number, token: string) {
    const user = await this.prismaService.$queryRaw`
    SELECT id
    FROM user_session
    WHERE token = ${token}`;
    
    if(!user[0]) {
      throw new UnauthorizedException('Sem permissão');
    }

    const userId = user[0].id

    const saved_recipe = await this.prismaService.$queryRaw`
    DELETE FROM user_saved_recipes
    WHERE user_id = ${userId} AND recipe_id = ${recipeId}`;

    return saved_recipe;
  }
}
