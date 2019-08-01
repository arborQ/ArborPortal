import { Module } from '@nestjs/common';
import { SeachController } from './seach/seach.controller';
import { DetailsController } from './details/details.controller';
import { RecipeSearch } from './recipe-search';
import { RecipeDetails } from './recipe-details';
import { Config } from '../config';

@Module({
    controllers: [
        SeachController,
        DetailsController,
    ],
    providers: [Config, RecipeSearch, RecipeDetails],
})
export class RecipesModule { }
