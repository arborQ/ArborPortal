using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using MediatR;
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
