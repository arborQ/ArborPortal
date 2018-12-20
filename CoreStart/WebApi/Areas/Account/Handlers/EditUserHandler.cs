using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class EditUserHandler : IRequestHandler<EditUserViewModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;

        public EditUserHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }

        public Task<IUser> Handle(EditUserViewModel request, CancellationToken cancellationToken)
        {
            var user = _usersCoreService.EditElement(request.Id, request);

            return Task.FromResult(user);
        }
    }
}
