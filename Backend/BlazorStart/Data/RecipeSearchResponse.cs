using System.Collections.Generic;

namespace BlazorStart.Data {
    public class RecipeSearchResponse {
        public List<RecipeModel> Items { get; set; }

        // public int TotalCount { get; set; }
    }
}

/* 
       {"items":[{"id":"5d820603d4fe364a70f0108c","recipeName":"Rosół na bidaka","recipeDescription":"Do Wodę dodaj Kurczaka"},{"id":"5d82061cd4fe364a70f0108d","recipeName":"Racuchy","recipeDescription":"Do Wodę dodaj Kurczaka"}],"totalCount":{"value":2,"relation":"eq"}}
        */