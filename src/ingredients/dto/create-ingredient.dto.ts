import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    image: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    user_created: string;
}
