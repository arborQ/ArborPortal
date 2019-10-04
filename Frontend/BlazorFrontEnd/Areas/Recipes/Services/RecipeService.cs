using System.Net.Http;
using System.Threading.Tasks;
using BlazorStart.Recipes.Models;
using BlazorStart.Data;

namespace BlazorStart.Recipes.Services {
    public class RecipeService : BaseApiClient {
        public RecipeService (HttpClient client) : base (client, "http://localhost:8012/api/recipes") { }

        public async Task<RecipeSearchResponse> SearchRecipes (string search) {
            var response = await GetAsync<RecipeSearchResponse> ($"?search={search}");

            return response;
        }

        public async Task<DetailsResponse<RecipeModel>> GetRecipe(string recipeId) {
            var response = await GetAsync<DetailsResponse<RecipeModel>> ($"/{recipeId}");
            return response;
        }

        public async Task<CreateResponse<string>> CreateRecipe(RecipeModel model) {
            var response =  await PostAsync<CreateResponse<string>>(model);
            
            return response;
        }

        public async Task<UpdateResponse> UpdateRecipe(RecipeModel model) {
            var response =  await PutAsync<UpdateResponse>(model);

            return response;
        }
    }
}