using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers.Users
{
    public class QueryUsersHandler : IRequestHandler<QueryUsersFilterModel, IReadOnlyCollection<IUser>>
    {
        private readonly IUsersCoreService _usersCoreService;

        public QueryUsersHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }

        public async Task<IReadOnlyCollection<IUser>> Handle(QueryUsersFilterModel request, CancellationToken cancellationToken)
        {
            var users = _usersCoreService.GetElements();

            return await Task.FromResult(users);
        }
    }
}
