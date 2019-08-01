import { RepositorySchema } from '../baseRepository';
import { IIngredient, IngredientSchema } from './ingredient';

export interface IStep {
    name: string;
    ingredients: IIngredient[];
    description: string;
}


export const StepSchema: RepositorySchema<IStep> = {
    name: { type: String },
    ingredients: { type: [IngredientSchema] },
    description: { type: String },
};