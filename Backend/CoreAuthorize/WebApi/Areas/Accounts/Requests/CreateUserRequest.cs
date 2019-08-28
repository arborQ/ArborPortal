using AuthorizeLogin.Areas.Accounts.Responses;
using MediatR;

namespace AuthorizeLogin.Areas.Accounts.Models
{
    public class CreateUserRequest : IRequest<CreateUserResponse>
    {
        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
