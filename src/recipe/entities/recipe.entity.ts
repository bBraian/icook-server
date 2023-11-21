export class Recipe {
    id?: number;
    title: string;
    image: string;

    serves: number;
    categoryId: number;
    typeId: number;

    cookTime: string;
    private: boolean;

    ingredients: {
        id: number;
        ingredientId: number;
        ingredientImg: string;
        ingredientName: string;
        amount: string;
    };
    steps: {
        id: number;
        text: string;
    };
}
