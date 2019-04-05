using System;
using System.Linq;
using CoreStart.CrossCutting.Structure.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class PortalAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private UserClaims _userClaimFlag;

        public PortalAuthorizeAttribute(UserClaims userClaimFlag)
        {
            _userClaimFlag = userClaimFlag & UserClaims.Authorized;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasClaim = context.HttpContext.User.Claims
                .Any(c => c.Type == "UserClaims" && Enum.Parse<UserClaims>(c.Value).HasFlag(_userClaimFlag));

            if (!hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
