import { IsInt, Length } from "class-validator";
import cosmosRepository from '../cosmosRepository';

export class FavouriteModel {
    storageKey: string;

    itemId: string;
}

export async function createRepository() {
    return cosmosRepository('favourites', 'favouritesList');
}
