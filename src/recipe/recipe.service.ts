import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prismaService: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto, token: string) {
    try {
      const userSession: any = await this.prismaService.$queryRaw`
      SELECT user_id
      FROM user_session
      WHERE token = ${token}`;

      const res = await this.prismaService.recipe.create({
        data: {
          recipe_categories_id: createRecipeDto.categoryId,
          recipe_types_id: createRecipeDto.typeId,
          name: createRecipeDto.title,
          image: createRecipeDto.image,
          serves: createRecipeDto.serves,
          kitchen_time: createRecipeDto.cookTime,
          private: createRecipeDto.private,
          user_id: userSession[0].user_id
        }
      })

      const recipeId = res.id

      const ingredients: any = createRecipeDto.ingredients;
      const steps: any = createRecipeDto.steps;
      //insert ingredients
      ingredients.map(async ingredient => {
        console.log(ingredient)
        await this.prismaService.recipeIngredients.create({
          data: {
            recipe_id: recipeId,
            ingredient_id: ingredient.ingredientId,
            amount: ingredient.amount
          }
        })
      })

      //insert steps
      steps.map(async step => {
        await this.prismaService.recipeSteps.create({
          data: {
            recipe_id: recipeId,
            description: step.text
          }
        })
      })

      // console.log(createRecipeDto)
      return { ...createRecipeDto, id: recipeId};
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return this.prismaService.recipe.findMany({
      include: {
        ingredient: true
      }
    });
  }

  async findOne(id: number, token?: string) {
    const recipe: any = await this.prismaService.$queryRaw`
    SELECT r.*, u.name AS user_name, u.avatar, c.name AS category_name, t.name AS type_name,
    (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
    (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum,
    IF((SELECT usr.recipe_id 
    FROM user_saved_recipes usr
    WHERE usr.recipe_id = r.id AND usr.user_id = s.user_id) IS NULL, FALSE, TRUE) AS saved,
    IF((SELECT rr.id
    FROM recipe_rating rr
    WHERE rr.recipe_id = r.id AND rr.user_id = s.user_id) IS NULL, FALSE, TRUE) AS rated,
    (SELECT rating FROM recipe_rating WHERE recipe_id = r.id AND user_id = u.id) AS rate
    FROM recipe r
    INNER JOIN user u ON u.id = r.user_id
    LEFT JOIN user_session s ON s.token = ${token}
    LEFT JOIN user_saved_recipes sr ON sr.recipe_id = r.id AND sr.user_id = u.id
    LEFT JOIN recipe_categories c ON c.id = r.recipe_categories_id
    LEFT JOIN recipe_types t ON t.id = r.recipe_types_id
    WHERE r.id = ${id}`;

    const ingredients = await this.prismaService.$queryRaw`
    SELECT i.id, i.name, i.image, ri.amount
    FROM recipe_ingredients ri
    INNER JOIN ingredients i ON i.id = ri.ingredient_id
    WHERE ri.recipe_id = ${id}`;

    const steps = await this.prismaService.recipeSteps.findMany({
      select: {
        id: true,
        description: true
      },
      where: {
        recipe_id: id 
      }
    })

    const parsedRecipe = {
      ...recipe[0],
      review_amount: Number(recipe[0].review_amount),
      rating_sum: Number(recipe[0].rating_sum),
      saved: Boolean(recipe[0].saved),
      rated: Boolean(recipe[0].rated),
      ingredients,
      steps
    };
    return parsedRecipe;
  }

  async trending(token?: string) {
    const recipes: any = await this.prismaService.$queryRaw`
    SELECT r.*, u.name AS user_name, u.avatar, c.name AS category_name, t.name AS type_name,
    (SELECT COUNT(id) FROM recipe_rating WHERE recipe_id = r.id) AS review_amount,
    (SELECT SUM(rating) FROM recipe_rating WHERE recipe_id = r.id) AS rating_sum,
    IF((SELECT r.recipe_id 
    FROM user_saved_recipes r
    WHERE recipe_id = r.id AND r.user_id = s.user_id) IS NULL, FALSE, TRUE) AS saved,
    IF((SELECT rr.id
    FROM recipe_rating rr
    WHERE rr.recipe_id = r.id AND rr.user_id = s.user_id) IS NULL, FALSE, TRUE) AS rated,
    (SELECT rating FROM recipe_rating WHERE recipe_id = r.id AND user_id = u.id) AS rate,
    (SELECT COUNT(i.id) FROM recipe_ingredients i WHERE i.recipe_id = r.id) AS ingredients_amount
    FROM recipe r
    INNER JOIN user u ON u.id = r.user_id
    LEFT JOIN user_session s ON s.token = ${token}
    LEFT JOIN user_saved_recipes sr ON sr.recipe_id = r.id AND sr.user_id = u.id
    LEFT JOIN recipe_categories c ON c.id = r.recipe_categories_id
    LEFT JOIN recipe_types t ON t.id = r.recipe_types_id
    WHERE r.private = 0
    LIMIT 25`;

    const parsedRecipe = recipes.map(recipe => ({
      ...recipe,
      review_amount: Number(recipe.review_amount),
      rating_sum: Number(recipe.rating_sum),
      saved: Boolean(recipe.saved),
      rated: Boolean(recipe.rated),
      ingredients_amount: Number(recipe.ingredients_amount),
      rating: Number(Number(recipe.rating_sum) / Number(recipe.review_amount))
    }));

    return parsedRecipe;
  }

  async recent(token?: string) {
    const recipes: any = await this.prismaService.$queryRaw`
    SELECT r.*, u.name AS user_name, c.name AS category_name, t.name AS type_name
    FROM recipe r
    INNER JOIN user u ON u.id = r.user_id
    LEFT JOIN user_session s ON s.token = ${token}
    LEFT JOIN user_saved_recipes sr ON sr.recipe_id = r.id AND sr.user_id = u.id
    LEFT JOIN recipe_categories c ON c.id = r.recipe_categories_id
    LEFT JOIN recipe_types t ON t.id = r.recipe_types_id
    WHERE r.private = 0
    ORDER BY r.created_at DESC
    LIMIT 30`;

    return recipes;
  }

  remove(id: number) {
    return this.prismaService.recipe.delete({
      where: {id}
    });
  }

  async rateRecipe(id: number, token: string, rate: number) {
    const userId = await this.prismaService.$queryRaw`
    SELECT id
    FROM user_session
    WHERE token = ${token}`;
    
    if(!userId[0]) {
      throw new UnauthorizedException('Sem permissão');
    }

    const user = userId[0].id

    const alreadyExist = await this.prismaService.$queryRaw`
    SELECT id 
    FROM recipe_rating
    WHERE recipe_id = ${id} AND user_id = ${user}`;

    if(!rate) {
      throw new ForbiddenException('Rate forbidden')
    }

    let res = {};
    if(alreadyExist[0]) {
      res = await this.prismaService.$queryRaw`
      UPDATE recipe_rating
      SET rating = ${rate} 
      WHERE recipe_id = ${id} AND user_id = ${user}`;
    } else {
      res = await this.prismaService.$queryRaw`
      INSERT INTO recipe_rating (user_id, rating, recipe_id) 
      VALUES (${user}, ${rate}, ${id})`;
    }

    return res
  }
}
