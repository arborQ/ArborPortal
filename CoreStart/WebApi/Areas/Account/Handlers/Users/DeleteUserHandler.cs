using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using MediatR;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers.Users
{
    public class DeleteUserHandler : IRequestHandler<DeleteUserViewModel, long>
    {
        private readonly IUsersCoreService _usersCoreService;

        public DeleteUserHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }

        public async Task<long> Handle(DeleteUserViewModel request, CancellationToken cancellationToken)
        {
            await _usersCoreService.RemoveAsync(new[] { request.Id });

            return await Task.FromResult(request.Id);
        }
    }
}
