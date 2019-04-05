using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Security;
using CoreStart.CrossCutting.Structure.Services;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using WebApi.Areas.Account.Responses;

namespace WebApi.Areas.Account.Handlers
{
    public class CookieBasedAuthorizeHandler : INotificationHandler<AuthorizeResponseModel>
    {
        private readonly IContextAccessor Context;

        public CookieBasedAuthorizeHandler(IContextAccessor context)
        {
            Context = context;
        }

        public async Task Handle(AuthorizeResponseModel notification, CancellationToken cancellationToken)
        {
            if (!notification.IsAuthorized)
            {
                return;
            }

            var claims = GetClaims(notification).ToList();

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await Context.SignInAsync(new ClaimsPrincipal(claimsIdentity), true);
        }

        private IEnumerable<Claim> GetClaims(AuthorizeResponseModel user)
        {
            yield return new Claim(nameof(AuthorizeResponseModel.UserId), user.UserId.ToString());
            yield return new Claim(nameof(AuthorizeResponseModel.UserName), user.UserName);
            yield return new Claim("UserClaims", (UserClaims.Authorized & UserClaims.UsersRead).ToString());
        }
    }
}
