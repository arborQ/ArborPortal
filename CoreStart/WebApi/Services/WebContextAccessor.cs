using System;
using System.Security.Claims;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;

namespace WebApi.Services
{
    public class WebContextAccessor : IContextAccessor
    {
        private readonly IHttpContextAccessor Context;

        public WebContextAccessor(IHttpContextAccessor context)
        {
            Context = context;
        }

        public async Task SignInAsync(ClaimsPrincipal principal, bool allowRefresh)
        {
            var authProperties = new AuthenticationProperties
            {
                IssuedUtc = DateTime.UtcNow,
                AllowRefresh = true
            };

            await Context.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                principal,
                authProperties);
        }
    }
}
