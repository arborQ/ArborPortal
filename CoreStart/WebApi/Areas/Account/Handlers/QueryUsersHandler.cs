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
            //await _searchIndexer.ReIndex<IUser>(new IUser[0]);
            var users = await _searchIndexer.GetItems<UserViewModel>();

            return users;
        }
    }
}
