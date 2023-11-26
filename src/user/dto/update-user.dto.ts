import { User } from '../entities/user.entity';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends User {
  @IsString()
  @MinLength(4 , { message: 'Nome deve ter mais de 4 caracteres' })
  @MaxLength(200, { message: 'Nome não pode ter mais de 20 caracteres' })
  name: string;

  @IsString()
  @MaxLength(200, { message: 'Descrição não pode ter mais de 200 caracteres' })
  @IsOptional()
  description?: string;
}