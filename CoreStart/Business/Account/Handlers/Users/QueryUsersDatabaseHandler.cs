using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class QueryUsersDatabaseHandler : UserBaseHandler,
        IRequestHandler<QueryUsersRequestModel<IUser>, QueryResponse<IUser>>
    {
        private readonly AccountUnitOfWork _unitOfWork;

        public QueryUsersDatabaseHandler(AccountUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<QueryResponse<IUser>> Handle(QueryUsersRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            var users = _unitOfWork.Users.Query()
                    .Where(u =>
                        string.IsNullOrEmpty(request.Search) || u.FullName.Contains(request.Search)
                    )
                    .Where(DefaultItemFilter);

            var count = await users.CountAsync();

            var items = await users
                .Skip(request.PageSize * (request.Page - 1))
                .Take(request.PageSize)
                .ToListAsync();

            return await Task.FromResult(new QueryResponse<IUser>
            {
                TotalCount = count,
                Items = items.Select(ModelToDto).ToList()
            });
        }
    }
}
