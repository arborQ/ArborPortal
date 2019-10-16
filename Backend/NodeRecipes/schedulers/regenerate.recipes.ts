import { RecipeDto, Recipes } from '../src/modify/schemats/recipe';
import { ElasticSearchClientService } from '../src/elastic-search-client/elastic-search-client.service';
let isRunning = false;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export default async function RegenerateRecipes() {
    if (isRunning) {
        console.log('is already running', isRunning);
        return;
    }

    try {
        isRunning = true;

        console.log('start recalculating');
        const es = new ElasticSearchClientService();
        // await es.deleteIndex(`recipes*`);
        const recipes = await Recipes();
        const recipeList = await recipes.find().exec();
        const regularIndexName = 'recipes';
        const newIndexName = `${regularIndexName}_temp_${new Date().getTime()}`;

        await es.createIndex(newIndexName);

        console.log(`Items to re-index: ${recipeList.length}`);
        for (let i = 0; i < recipeList.length; i++) {
            const recipe = recipeList[i];
            console.log(recipe.recipeName);
            try {
                await es.add(newIndexName, {
                    id: recipe._id,
                    recipeName: recipe.recipeName,
                    recipeDescription: recipe.recipeDescription,
                });
            } catch (e) {
                console.log(`error for : ${recipe._id} ${recipe.recipeName}`, e);
            }
            await sleep(200);
        }
        await es.switchAlias(newIndexName, regularIndexName);
    } catch (e) {
        console.log('Elastic error:', e);
    } finally {
        console.log('Free lockdown');
        isRunning = false;
    }
}
