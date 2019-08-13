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

        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<string> IsOk()
        {
            return await Task.FromResult("works");
        }

        // POST api/values
        [HttpPost]
        public async Task<LoginResponse> LoginWithUserNameAndPassword([FromBody] LoginRequest model)
        {
            var response = await _mediator.Send(model);

            return response;
        }
    }
}
