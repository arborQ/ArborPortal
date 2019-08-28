using System.ComponentModel.DataAnnotations.Schema;
using AuthorizeLogin.Areas.Authorize.Responses;
using MediatR;

namespace AuthorizeLogin.Areas.Authorize.Requests
{
    public class LoginRequest : IRequest<LoginResponse>
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}
