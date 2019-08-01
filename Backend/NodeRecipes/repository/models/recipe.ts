import BaseRepository, { RepositorySchema } from '../baseRepository';
import { IStep, StepSchema } from './step';
import { IIngredient, IngredientSchema } from './ingredient';

export interface IRecipe {
    name: string;
    ingredients: IIngredient[];
    steps: IStep[]
}

export const RecipeSchema: RepositorySchema<IRecipe> = {
    name: { type: String },
    ingredients: { type: [IngredientSchema] },
    steps: { type: [StepSchema] },
};