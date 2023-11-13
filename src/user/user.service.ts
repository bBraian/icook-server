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

  async findOne(id: number) {
    const user: any = await this.prismaService.$queryRaw`
    SELECT u.name, u.avatar, u.description,
    IF((SELECT user_id FROM user_session WHERE token = 'vamointer' AND user_id = ${id}) IS NULL, 0, 1) AS is_me
    FROM user u
    WHERE u.id = ${id}`;

    let userRecipes = null;
    let userSavedRecipes = null;
    if(Boolean(user[0].is_me)) {
      userRecipes = await this.prismaService.recipe.findMany({
        where: { user_id: id }
      })

      userSavedRecipes = await this.prismaService.userSavedRecipes.findMany({
        include: { recipe: true },
        where: { user_id: id }
      })
    } else {
      userRecipes = await this.prismaService.recipe.findMany({
        where: { user_id: id, private: false }
      })
    }

    const parsedUser = {
      ...user[0],
      is_me: Boolean(user[0].is_me),
      recipes: userRecipes,
      saved_recipes: Boolean(user[0].is_me) ? userSavedRecipes : undefined
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
