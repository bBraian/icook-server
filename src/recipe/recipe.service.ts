import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prismaService: PrismaService) {}

  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe';
  }

  findAll() {
    return `This action returns all recipe`;
  }

  async getRating(id: number): Promise<{ ratingAmount: number; averageRating: number }> {
    const ratings = await this.prismaService.recipeRating.findMany({
      where: {
        recipe_id: id,
      },
    });

    const ratingAmount = ratings.length;
    const somaRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = ratingAmount > 0 ? somaRatings / ratingAmount : 0;

    return { ratingAmount, averageRating };
  }

  async findOne(id: number) {
    const recipe = await this.prismaService.recipe.findUnique({
      where: { id },
      include: {
        ingredient: true,
        RecipeSteps: true,
        category: true,
        type: true,
        user: {
          select: {
            name: true,
          }
        }
      },
    });

    const { ratingAmount, averageRating } = await this.getRating(id);

    return {
      ...recipe,
      rating: { ratingAmount, averageRating }
    };
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
