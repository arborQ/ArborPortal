import { Controller, Post, Body } from '@nestjs/common';
import { RecipeDto, Recipes } from '../schemats/recipe';
import { ElasticSearchClientService } from '../../elastic-search-client/elastic-search-client.service';

@Controller('/api/recipes')
export class CreateController {
    constructor(private readonly elasticSearch: ElasticSearchClientService) {

    }

    @Post()
    async createNewRecipe(@Body() model: RecipeDto): Promise<number> {
        try {
            const Recipe = await Recipes();
            const newRecipe = new Recipe(model);
            await newRecipe.save();
            // await this.elasticSearch.add('recipes', {
            //     id: newRecipe._id,
            //     recipeName: model.recipeName,
            //     recipeDescription: model.recipeDescription,
            // });

            return newRecipe.id;
        } catch (e) {
            return -1;
        }
    }
}
