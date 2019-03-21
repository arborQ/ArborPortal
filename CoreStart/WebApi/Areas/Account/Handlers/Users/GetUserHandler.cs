using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Areas.Account.Handlers.Users
{
    public class GetUserHandler : IRequestHandler<GetRecordModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;

        public GetUserHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }

        public async Task<IUser> Handle(GetRecordModel request, CancellationToken cancellationToken)
        {
            var user = _usersCoreService.GetElement(request.Id);

            return await Task.FromResult(user);
        }
    }
}
