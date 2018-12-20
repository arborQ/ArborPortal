using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class QueryUsersHandler : IRequestHandler<QueryUsersFilterModel, IReadOnlyCollection<IUser>>
    {
        private readonly IUsersCoreService _usersCoreService;

        public QueryUsersHandler(IUsersCoreService usersCoreService)
        {
            _usersCoreService = usersCoreService;
        }

        public Task<IReadOnlyCollection<IUser>> Handle(QueryUsersFilterModel request, CancellationToken cancellationToken)
        {
            var items = _usersCoreService.GetElements().Select(u => new UserViewModel
            {
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                FullName = u.FullName,
                Id = u.Id,
                Login = u.Login
            }).ToArray();

            return Task.FromResult(items as IReadOnlyCollection<IUser>);
        }
    }
}
