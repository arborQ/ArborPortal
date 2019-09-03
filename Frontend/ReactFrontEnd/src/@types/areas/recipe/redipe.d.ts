declare namespace Areas.Recipes {
    export interface IRecipe {
        id: string;
        recipeName: string;
        recipeDescription: string;
        mainFileName: string | null;
    }
}
