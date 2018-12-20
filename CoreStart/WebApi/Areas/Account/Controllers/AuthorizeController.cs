using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Structure.Models;
using Structure.Services;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;
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
        public async Task<string> SignIn([FromBody]LoginModel model)
        {
            var token = await Mediator.Send<string>(model);

            return token;
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