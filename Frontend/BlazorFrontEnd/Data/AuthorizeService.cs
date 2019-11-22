using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorStart.Data {
    public class AuthorizeService : BaseApiClient {
        public AuthorizeService (HttpClient client) 
            : base (client, "http://localhost:5001/api/account/login") { }

        public async Task<bool> AuthorizeUser (string login, string password) {
           try {
                var response = await PostAsync<ResponseAuthorizeModel>(new RequestAuthorizeModel { Login = login, Password = password });

                return response.IsSuccessfull || !string.IsNullOrEmpty(response.Token);
           }catch {
               return false;
           }
        }
    }
}
