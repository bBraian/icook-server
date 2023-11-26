import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @Headers('authorization') token: string) {
    return this.recipeService.create(createRecipeDto, token);
  }

  @Get('/trending')
  trending(@Headers('authorization') token?: string) {
    return this.recipeService.trending(token);
  }

  @Get('/all')
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') token?: string) {
    return this.recipeService.findOne(+id, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }

  @Patch('/rate/:id')
  rateRecipe(@Param('id') id: number, @Headers('authorization') token: string, @Body('rate') rate: number) {
    return this.recipeService.rateRecipe(+id, token, rate);
  }
}
