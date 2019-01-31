using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using Structure.Search;
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
        private readonly ISearchIndexer _searchIndexer;

        public QueryUsersHandler(IUsersCoreService usersCoreService, ISearchIndexer searchIndexer)
        {
            _usersCoreService = usersCoreService;
            _searchIndexer = searchIndexer;
        }

        public async Task<IReadOnlyCollection<IUser>> Handle(QueryUsersFilterModel request, CancellationToken cancellationToken)
        {
            var users = await _searchIndexer.GetItems<UserViewModel>("xxx");

            return users;

            //var items = _usersCoreService.GetElements().Select(u => new UserViewModel
            //{
            //    Email = u.Email,
            //    FirstName = u.FirstName,
            //    LastName = u.LastName,
            //    FullName = u.FullName,
            //    Id = u.Id,
            //    Login = u.Login
            //}).ToArray();

            //return await Task.FromResult(items as IReadOnlyCollection<IUser>);
        }
    }
}
