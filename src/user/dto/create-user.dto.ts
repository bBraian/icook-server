import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4 , { message: 'Senha deve ter mais de 4 caracteres' })
  @MaxLength(20, { message: 'Senha não pode ter mais de 20 caracteres' })
  password: string;

  @IsString()
  name: string;
}