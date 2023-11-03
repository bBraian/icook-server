import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private prismaService: PrismaService) {}

  create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  findAll() {
    return this.prismaService.ingredients.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
