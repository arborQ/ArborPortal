using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeLogin.Areas.Accounts.Models;
using AuthorizeLogin.Areas.Accounts.Responses;
using AuthorizeLogin.Persistance.Database.Models;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using AuthorizeLogin.Persistance.Database.Helpers;

namespace AuthorizeLogin.Areas.Accounts.Controllers
{

    [Route("api/[area]/[controller]")]
    [Area("Accounts")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IValidator<CreateUserRequest> _createUserRequestValidator;

        public UserController(IMediator mediator, IValidator<CreateUserRequest> createUserRequestValidator)
        {
            _mediator = mediator;
            _createUserRequestValidator = createUserRequestValidator;
        }

        [HttpPost]
        public async Task<CreateUserResponse> CreateNewUser([FromBody]CreateUserRequest model)
        {
            var validationResult = await _createUserRequestValidator.ValidateAsync(model);

            if (!validationResult.IsValid)
            {
                validationResult.Errors.Select(a => new { a.PropertyName, a.ErrorMessage });
                return new CreateUserResponse
                {
                    IsSuccessfull = false,
                    Errors = validationResult.Errors.Select(a => new PropertyErrorModel { PropertyName = a.PropertyName.ToCamelCase(), ErrorMessage = a.ErrorMessage }).ToArray()
                };
            }

            var response = await _mediator.Send(model);

            return response;
        }

        [HttpGet]
        public async Task<GetUsersResponse> GetUsers([FromQuery]GetUsersRequest model)
        {
            var response = await _mediator.Send(model);

            return response;
        }
    }
}
