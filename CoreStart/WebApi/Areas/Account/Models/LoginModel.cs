using MediatR;
using Structure.Models;

namespace WebApi.Areas.Account.Models
{
    public class LoginModel : IRequest<ICurrentUser>, IRequest<string>
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}
