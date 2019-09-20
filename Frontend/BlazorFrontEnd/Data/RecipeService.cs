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
    }
}