using MediatR;
using Microsoft.AspNetCore.Mvc;
using Structure.Business.Account.Models;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;
using WebApi.Models;

namespace WebApi.Areas.Account.Controllers
{
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

        [HttpGet]
        public async Task<IUser[]> Values()
        {
            var users = await _mediator.Send(new QueryUsersFilterModel());

            return users.ToArray();
        }

        [HttpGet("{id}")]
        public async Task<IUser> Value(long id)
        {
            var user = await _mediator.Send(GetRecordModel.ById(id));

            return user;
        }

        [HttpPut]
        public async Task<IUser> EditUser([FromBody]EditUserViewModel model)
        {
            var user = await _mediator.Send(model);

            return user;
        }

        [HttpPost]
        public async Task<IUser> CreateUser([FromBody]CreateUserViewModel model)
        {
            var user = await _mediator.Send(model);

            return user;
        }
    }
}
