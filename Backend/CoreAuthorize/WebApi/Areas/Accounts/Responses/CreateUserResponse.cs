using AuthorizeLogin.Persistance.Database.Models;

namespace AuthorizeLogin.Areas.Accounts.Responses
{
    public class CreateUserResponse
    {
        public long? CreatedUserId { get; set; }

        public bool IsSuccessfull { get; set; }

        public PropertyErrorModel[] Errors { get; set; } = new PropertyErrorModel[0];
    }
}
