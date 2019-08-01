import BaseRepository from './baseRepository';
import { IRecipe, RecipeSchema } from './models/recipe';

class RecipeRepository extends BaseRepository<IRecipe> {
    constructor() {
        super('recipe', RecipeSchema);
    }
}

export const recipeRepository = new RecipeRepository();