using System;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorStart.Data {
    public class AuthorizeService {
        public async Task<bool> AuthorizeUser (string login, string password) {
            await Task.Delay (1500);

            return true;
        }
    }
}