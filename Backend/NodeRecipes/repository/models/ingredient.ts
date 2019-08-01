import BaseRepository, { RepositorySchema } from '../baseRepository';
import { Entity } from '../baseRepository';

export interface IIngredient {
    name: string;
    unit: string;
    amount: number
}

export const IngredientSchema: RepositorySchema<IIngredient> = {
    name: { type: String, required: true },
    unit: { type: String },
    amount: { type: Number },
};