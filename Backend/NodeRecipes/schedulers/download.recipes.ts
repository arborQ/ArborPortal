import fetch from 'node-fetch';
import { RecipeDto, Recipes } from '../src/modify/schemats/recipe';

// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52764

export default async function DownloadRecipes() {
    let startIndex = 52947;
    let keepGoing = true;

    setTimeout(() => {
        keepGoing = false;
    }, 25000);

    while (keepGoing) {
        try {
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${startIndex++}`;
            console.log({url});
            const data = await fetch(url).then(res => res.json());
            const { meals } = data;
            if (!!meals) {
                const [ meal ] = meals;

                console.log(meal.strMeal);

                const Recipe = await Recipes();
                const recipe = await Recipe.findOne({ recipeName: meal.strMeal });
                if ( recipe) {
                    const newRecipe = new Recipe({ recipeName : meal.strMeal, recipeDescription: meal.strInstructions });
                    await newRecipe.save();
                } else {
                    console.log('already exists')
                }
            } else {
                console.log('Not a meal');
            }
        } catch(e) {
            console.log('Fetch / mongo error');
        }
    }
}
