import { RecipeDto, Recipes } from '../src/modify/schemats/recipe';
import { ElasticSearchClientService } from '../src/elastic-search-client/elastic-search-client.service';
export default async function RegenerateRecipes() {
    console.log('start recalculating');
    const es = new ElasticSearchClientService();
    const recipes = await Recipes();
    const recipeList = await recipes.find().exec();
    await es.clear('recipe_temp');
    recipeList.forEach(recipe => {
        console.log(recipe)
        es.add('recipe_temp', { id: recipe._id, recipeName: 'xxxxxx', recipeDescription: recipe.recipeDescription });
    });

    await es.switchIndexes('recipe_temp', 'recipe');
    console.log('re-indexed');
}
