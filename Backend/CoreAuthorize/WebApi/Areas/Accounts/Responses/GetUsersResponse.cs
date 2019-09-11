using AuthorizeLogin.Areas.Accounts.Models;
using AuthorizeLogin.Persistance.Database.Models;
using System.Collections.Generic;

namespace AuthorizeLogin.Areas.Accounts.Responses
{
    public class GetUsersResponse
    {
        public IReadOnlyCollection<AccountModel> Accounts { get; set; }

        public bool IsSuccessfull { get; set; }

        public PropertyErrorModel[] Errors { get; set; } = new PropertyErrorModel[0];
    }
}
