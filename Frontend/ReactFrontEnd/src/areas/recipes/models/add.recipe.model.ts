import { Length } from 'class-validator';

export default class AddRecipeModel implements Areas.Recipes.IRecipe {
    id: string;
    @Length(1, 200)
    recipeName: string;
    recipeDescription: string;
    products: string[];
    mainFileName: string | null;
}
