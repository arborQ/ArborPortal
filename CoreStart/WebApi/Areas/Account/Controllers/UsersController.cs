using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using CoreStart.Business.Account.Requests;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.CrossCutting.Structure.Security;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.Data.Entity.Models.Account;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Areas.Account.Models;
using WebApi.Security;

namespace WebApi.Areas.Account.Controllers
{
    /// <summary>
    /// User CRUD controller
    /// </summary>
    [PortalAuthorize(UserClaims.UsersRead)]
    [Route("api/[area]/[controller]")]
    [Area("Account")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns>List of users</returns>
        [HttpGet]
        public async Task<QueryResponse<IUser>> Values([FromQuery]QueryUserRequestModel model)
        {
            var users = await _mediator.Send(model);

            return users;
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>Single user</returns>
        [HttpGet("edit/{Id}")]
        public async Task<SingleItemResponseModel<IUser>> Value(long id)
        {
            var user = await _mediator.Send(new SingleItemRequestModel<IUser> { Id = id });

            return user;
        }

        /// <summary>
        /// Edit user data
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPut]
        [PortalAuthorize(UserClaims.UserEdit)]
        public async Task<EditResponse<IUser>> EditUser([FromBody]EditUserViewModel model)
        {
            var user = await _mediator.Send(new EditRequestModel<IUser>
            {
                Id = model.Id,
                EditContract = model
            });

            return user;
        }

        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPost]
        [PortalAuthorize(UserClaims.UserCreate)]
        public async Task<CreateResponse<IUser>> CreateUser([FromBody]CreateUserViewModel model)
        {
            var user = await _mediator.Send(new CreateRequestModel<IUser> { NewItem = model });

            return user;
        }

        /// <summary>
        /// Remove user
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>None</returns>
        [HttpDelete]
        [PortalAuthorize(UserClaims.UserDelete)]
        public async Task<DeleteResponse<IUser>> DeleteUser(long id)
        {
            var response = await _mediator.Send(new DeleteRequestModel<IUser> { Id = id });

            return response;
        }
    }
}
