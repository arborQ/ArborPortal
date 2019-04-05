using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using WebApi.Areas.Account.Models;
using WebApi.Areas.Account.Responses;

namespace WebApi.Areas.Account.Handlers
{
    public class AuthorizeJwtTokenHandler : IRequestHandler<JwtAuthorizeModel, AuthorizeResponseModel>
    {
        public async Task<AuthorizeResponseModel> Handle(JwtAuthorizeModel request, CancellationToken cancellationToken)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadJwtToken(request.JwtToken);

                var userName = jsonToken.Claims.FirstOrDefault(c => c.Type == "nickname");

                return await Task.FromResult(new AuthorizeResponseModel
                {
                    ExpireDate = jsonToken.ValidTo,
                    Source = jsonToken.Subject.Split("|")[0],
                    UserId = jsonToken.Subject,
                    UserName = userName.Value
                });
            }
            catch
            {
                return AuthorizeResponseModel.NotAuthorized;
            }
        }
    }
}

