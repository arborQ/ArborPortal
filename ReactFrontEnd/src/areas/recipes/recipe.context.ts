import { createContext } from 'react';


interface IRecipeContext extends CardIndex.Context.ICardIndexContext<Areas.Recipes.IRecipe> {
}

export class RecipeContext implements IRecipeContext {
    items: Areas.Recipes.IRecipe[] = [];
    itemsLoaded(items: Areas.Recipes.IRecipe[]): void {
        this.items = [...items];
    }

    itemUpdated(item: Areas.Recipes.IRecipe): void {
        this.items = [
            ...this.items.map(r => {
                return r.id === item.id ? item : r;
            })
        ]
    }

    itemDeleted(itemId: number): void {
        this.items = [
            ...this.items.filter(r => r.id !== itemId)
        ]
    }
}

export default createContext<IRecipeContext>(new RecipeContext());
