import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Recipe } from "../entities/recipe.entity";

class Ingredient {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsNotEmpty()
    ingredientId: number;

    @IsString()
    ingredientName: string;

    @IsString()
    ingredientImg: string;

    @IsString()
    amount: string;
}

class Step {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    text: string;
}

export class CreateRecipeDto extends Recipe {
    @IsString()
    @MinLength(4 , { message: 'Titulo deve ter mais de 4 caracteres' })
    @MaxLength(20, { message: 'Titulo não pode ter mais de 20 caracteres' })
    title: string;

    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    cookTime: string;

    @IsNumber()
    @IsNotEmpty()
    serves: number;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    typeId: number;

    @IsBoolean()
    private: boolean;

    @ValidateNested({ each: true })
    ingredients: Ingredient;

    @ValidateNested({ each: true })
    steps: Step;
}