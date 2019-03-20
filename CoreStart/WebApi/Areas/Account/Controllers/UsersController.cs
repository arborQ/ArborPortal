using MediatR;
using Microsoft.AspNetCore.Mvc;
using Structure.Business.Account.Models;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;
using WebApi.Models;

namespace WebApi.Areas.Account.Controllers
{
    /// <summary>
    /// User CRUD controller
    /// </summary>
    [Route("api/[area]/[controller]")]
    [Area("Account")]
    [ApiController]
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
        public async Task<IUser[]> Values()
        {
            var users = await _mediator.Send(new QueryUsersFilterModel());

            return users.ToArray();
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>Single user</returns>
        [HttpGet("{id}")]
        public async Task<IUser> Value(long id)
        {
            var user = await _mediator.Send(GetRecordModel.ById(id));

            return user;
        }

        /// <summary>
        /// Edit user data
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPut]
        public async Task<IUser> EditUser(EditUserViewModel model)
        {
            var user = await _mediator.Send(model);

            return user;
        }

        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPost]
        public async Task<IUser> CreateUser([FromBody]CreateUserViewModel model)
        {
            var user = await _mediator.Send(model);

            return user;
        }

        /// <summary>
        /// Remove user
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>None</returns>
        [HttpDelete]
        public async Task DeleteUser(long id)
        {
            await _mediator.Send(new DeleteUserViewModel { Id = id });
        }
    }
}
