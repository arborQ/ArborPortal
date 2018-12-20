using Microsoft.AspNetCore.Http;
using Structure.Models;
using Structure.Services;
using System;
using System.Security.Claims;
using WebApi.Models;

namespace WebApi.Services
{
    public class CurrentUserPrincipalProvider : IUserPrincipalService
    {
        private readonly IHttpContextAccessor HttpContextAccessor;

        public CurrentUserPrincipalProvider(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        public bool IsAuthorized => HttpContextAccessor.HttpContext.User.Identity.IsAuthenticated;

        public ICurrentUser User
        {
            get
            {
                if (!IsAuthorized)
                {
                    throw new UnauthorizedAccessException();
                }

                var identity = HttpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                return CurrentUser.CreateFromClaims(identity.Claims);
            }
        }
    }
}
