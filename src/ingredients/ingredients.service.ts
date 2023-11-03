import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private prismaService: PrismaService) {}

  create(createIngredientDto: CreateIngredientDto) {
    return this.prismaService.ingredients.create({
      data: createIngredientDto
    })
  }

  findAll() {
    return this.prismaService.ingredients.findMany();
  }

  findOne(id: number) {
    return this.prismaService.ingredients.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.prismaService.ingredients.update({
      where: { id },
      data: updateIngredientDto
    })
  }

  remove(id: number) {
    return this.prismaService.ingredients.delete({
      where: { id }
    });
  }
}
