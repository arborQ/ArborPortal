using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class CreateUserHandler : IRequestHandler<CreateUserViewModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;

        public CreateUserHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }


        public Task<IUser> Handle(CreateUserViewModel request, CancellationToken cancellationToken)
        {
            var newUser = _usersCoreService.AddElement(request);

            return Task.FromResult(newUser);
        }
    }
}
