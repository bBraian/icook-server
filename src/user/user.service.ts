import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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
        UPDATE UserSession
        SET token = ${token}, expire_date = DATE_ADD(NOW(), INTERVAL 30 DAY)
        WHERE user_id = ${user.id}`;
    } else {
      const res = await this.prismaService.$queryRaw`
        INSERT INTO UserSession (user_id, token, expire_date) 
        VALUES (${user.id}, ${token}, DATE_ADD(NOW(), INTERVAL 30 DAY)); `;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
