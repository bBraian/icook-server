import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number, token?: string) {
    const user: any = await this.prismaService.$queryRaw`
    SELECT u.name, u.avatar, u.description,
    IF((SELECT user_id FROM user_session WHERE token = ${token} AND user_id = ${id}) IS NULL, 0, 1) AS is_me
    FROM user u
    WHERE u.id = ${id}`;

    let userRecipes = null;
    let userSavedRecipes = null;
    if(Boolean(user[0].is_me)) {
      userRecipes = await this.prismaService.$queryRaw`SELECT r.*, 
      (SELECT COUNT(id) FROM recipe_ingredients WHERE r.id = recipe_id) AS ingredients_amount,
      (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
      (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum
      FROM recipe r
      WHERE r.user_id = ${id}`

      console.log(userRecipes)

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
      WHERE r.user_id = ${id} AND r.private = FALSE`
    }

    const parsedRecipes = userRecipes.map(recipe => ({
      ...recipe,
      ingredients_amount: Number(recipe.ingredients_amount),
      review_amount: Number(recipe.review_amount),
      rating_sum: Number(recipe.rating_sum),
    }));

    const parsedSavedRecipes = userRecipes.map(savedRecipe => ({
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

    console.log(user)
    return parsedUser;
  }

  getUser(token: string) {
    return this.prismaService.$queryRaw`
    SELECT u.name, u.avatar
    FROM user_session us
    INNER JOIN user u ON u.id = us.user_id
    where us.token = ${token}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
