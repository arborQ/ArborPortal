using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorStart.Data {
    public class AuthorizeService : BaseApiClient {
        public AuthorizeService (HttpClient client) : base (client, "http://localhost:5004/api/authorize/login") { }

        public async Task<bool> AuthorizeUser (string login, string password) {
            var response = await PostAsync<ResponseAuthorizeModel>(new RequestAuthorizeModel { Login = login, Password = password });

            return response.IsSuccessfull;
        }
    }
}