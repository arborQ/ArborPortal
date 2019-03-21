﻿using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Areas.Account.Models;

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
        public async Task<QueryResponse<IUser>> Values([FromQuery]QueryUsersRequestModel<IUser> model)
        {
            var users = await _mediator.Send(model);

            return users;
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>Single user</returns>
        [HttpGet("{Id}")]
        public async Task<IUser> Value(long id)
        {
            var user = await _mediator.Send(new GetUserRequestModel<IUser> { Id = id });

            return user;
        }

        /// <summary>
        /// Edit user data
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPut]
        public async Task<EditResponse<IUser>> EditUser([FromBody]EditUserViewModel model)
        {
            var user = await _mediator.Send(new EditUserRequestModel<IUser>
            {
                Id = model.Id,
                EditUser = model
            });

            return user;
        }

        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="model">Model representing new user</param>
        /// <returns>Single edited user</returns>
        [HttpPost]
        public async Task<CreateResponse<IUser>> CreateUser([FromBody]CreateUserViewModel model)
        {
            var user = await _mediator.Send(new CreateUserRequestModel<IUser> { CreatedUser = model });

            return user;
        }

        /// <summary>
        /// Remove user
        /// </summary>
        /// <param name="id">Id of user</param>
        /// <returns>None</returns>
        [HttpDelete]
        public async Task<DeleteResponse<IUser>> DeleteUser(long id)
        {
            var response = await _mediator.Send(new DeleteUserRequestModel<IUser> { Id = id });

            return response;
        }
    }
}
