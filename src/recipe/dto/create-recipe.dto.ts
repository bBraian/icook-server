import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Recipe } from "../entities/recipe.entity";

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
}
