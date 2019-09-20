using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorStart.Data {
    public class FavouriteService : BaseApiClient {
        public FavouriteService (HttpClient client) : base (client, "http://localhost:7071/api/FavouriteToggleFunction") { }

        public async Task ToggleFavourite (string recipeId) {
            await GetAsync($"/recipes/{recipeId}");
        }
    }
}