using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorStart.Data {
    public class RecipeService : BaseApiClient {
        public RecipeService(HttpClient client) 
            : base(client, "http://localhost:8012/api/recipes")
        {
        }

        public async Task<RecipeSearchResponse> SearchRecipes (string search) {
            var response = await GetAsync<RecipeSearchResponse> ();

            return response;
        }

        /* 
        {"items":[{"id":"5d820603d4fe364a70f0108c","recipeName":"Rosół na bidaka","recipeDescription":"Do Wodę dodaj Kurczaka"},{"id":"5d82061cd4fe364a70f0108d","recipeName":"Racuchy","recipeDescription":"Do Wodę dodaj Kurczaka"}],"totalCount":{"value":2,"relation":"eq"}}
         */
    }
}