using MediatR;
using WebApi.Areas.Account.Responses;

namespace WebApi.Areas.Account.Models
{
    public class JwtAuthorizeModel : IRequest<AuthorizeResponseModel>
    {
        public string Token { get; set; }
    }
}
