using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests;
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
    [ExcludeFromCodeCoverage]
    public class AuthorizeController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserPrincipalService _userPrincipalService;

        public AuthorizeController(IMediator mediator, IUserPrincipalService userPrincipalService, IOptions<WebConfiguration> configuration)
        {
            _mediator = mediator;
            _userPrincipalService = userPrincipalService;
        }

        [HttpPost]
        public async Task<AuthorizeResponseModel> SignIn([FromBody]JwtAuthorizeModel model)
        {
            var response = await _mediator.Send(model);

            await _mediator.Send(new CreateRequestModel<IUser>
            {
               NewItem = new CreateUserViewModel
               {
                   FirstName = response.FirstName,
                   LastName = response.LastName,
                   Email = response.Email,
                   IsActive = true,
                   Login = response.UserName
               }
            });
            
            return response;
        }

        [HttpDelete]
        public async Task SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet]
        [Authorize]
        public void IsAuthorized()
        {
            //return _userPrincipalService.User;
        }
    }
}