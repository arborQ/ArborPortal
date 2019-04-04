using System.Security.Claims;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Models;
using CoreStart.CrossCutting.Structure.Services;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Areas.Account.Models;
using WebApi.Areas.Account.Responses;
using WebApi.Models;

namespace WebApi.Areas.Account
{
    [Route("api/[area]/[controller]")]
    [Area("Account")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly IMediator Mediator;
        private readonly IUserPrincipalService UserPrincipalService;

        public AuthorizeController(IMediator mediator, IUserPrincipalService userPrincipalService, IOptions<WebConfiguration> configuration)
        {
            Mediator = mediator;
            UserPrincipalService = userPrincipalService;
        }

        [HttpPost]
        public async Task<AuthorizeResponseModel> SignIn([FromBody]JwtAuthorizeModel token)
        {
            var response = await Mediator.Send(token);
            await Mediator.Publish(response);

            return response;
        }

        [HttpDelete]
        public async Task SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet]
        [Authorize]
        public ICurrentUser IsAuthorized()
        {
            return UserPrincipalService.User;
        }
    }
}