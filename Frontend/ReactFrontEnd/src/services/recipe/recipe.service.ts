import { post } from '@bx-utils/ajax';

export async function createNewRecipe(recipe: Areas.Recipes.IRecipe): Promise<number> {
    return post<number>('/api/recipes', recipe);
}
