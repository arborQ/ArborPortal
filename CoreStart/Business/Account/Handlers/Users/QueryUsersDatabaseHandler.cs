using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.Data.Entity.Models.Account;
using MediatR;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class QueryUsersDatabaseHandler : IRequestHandler<QueryUsersRequestModel<User>, IReadOnlyCollection<User>>
    {
        private readonly AccountUnitOfWork _unitOfWork;

        public QueryUsersDatabaseHandler(AccountUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IReadOnlyCollection<User>> Handle(QueryUsersRequestModel<User> request, CancellationToken cancellationToken)
        {
            return (await _unitOfWork.Users.GetRecordsAsAsync(u => u.IsActive)).ToList();
        }
    }
}
