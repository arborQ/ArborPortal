using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Security
{
    public class PortalAuthorizeAttribute : IAuthorizationFilter
    {
        private UserClaims _userClaimFlag;

        public PortalAuthorizeAttribute(UserClaims userClaimFlag)
        {
            _userClaimFlag = userClaimFlag;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            throw new NotImplementedException();
        }
    }
}
