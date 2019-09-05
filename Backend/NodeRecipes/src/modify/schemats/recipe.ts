import * as mongoose from 'mongoose';

export interface IRecipeDto {
    id?: any;
    recipeName: string;
    recipeDescription: string;
    imageCode: string;
}

export interface IRecipe extends mongoose.Document, IRecipeDto {

}

export class RecipeDto {
    id?: string;
    recipeName: string;
    recipeDescription: string;
    imageCode: string;
}

export const RecipeSchema = new mongoose.Schema({
    recipeName: String,
    recipeDescription: String,
    imageCode: String,
});

export const Recipes = async () => {
    return mongoose.model<IRecipe>('Recipe', RecipeSchema);
};
