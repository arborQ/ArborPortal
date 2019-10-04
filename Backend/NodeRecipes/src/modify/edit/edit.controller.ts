import { Controller, Put, Body, Get, Param } from '@nestjs/common';
import { RecipeViewModel, Recipes } from '../schemats/recipe';
import { ElasticSearchClientService } from '../../elastic-search-client/elastic-search-client.service';

@Controller('/api/recipes')
export class EditController {
    constructor(private readonly elasticSearch: ElasticSearchClientService) {

    }

    @Put()
    async createNewRecipe(@Body() model: RecipeViewModel): Promise<number> {
        try {
            const Recipe = await Recipes();
            const res = await Recipe.updateOne(
                { _id: model.Id },
                { $set: { recipeName: model.RecipeName, recipeDescription: model.RecipeDescription } });
        } catch (e) {
            return -1;
        }
    }

    @Get(':id')
    async getRecipeById(@Param('id') id) {
        const Recipe = await Recipes();
        const itemData = await Recipe.findById(id);
        return {
            itemData,
        };
    }

}
