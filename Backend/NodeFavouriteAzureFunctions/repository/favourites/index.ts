import { IsInt, Length } from "class-validator";
import cosmosRepository from '../cosmosRepository';

export class FavouriteModel {
    @Length(3, 10)
    storageKey: string;

    @IsInt()
    itemId: number;
}

export async function createRepository() {
    return cosmosRepository('favourites', 'favouritesList');
}
