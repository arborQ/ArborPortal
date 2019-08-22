using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using AuthorizeLogin.Areas.Authorize.Requests;
using AuthorizeLogin.Areas.Authorize.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizeLogin.Areas.Authorize.Controllers
{
    [Route("api/[area]/[controller]")]
    [Area("Authorize")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;
        private const string AuthorizationHeaderKey = "Authorization";

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<LoginResponse> LoginWithUserNameAndPassword([FromBody] LoginRequest model)
        {
            var response = await _mediator.Send(model);

            return response;
        }

        [HttpDelete]
        public void LogoutUser()
        {
            HttpContext.Response.Cookies.Delete(AuthorizationHeaderKey);
        }
    }
}
