using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Dtos;
using CoreStart.Business.Account.Requests;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Account;
using MediatR;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class QueryUsersDatabaseHandler : 
        QueryBaseHandler<User, IUser, QueryUserRequestModel>, 
        IRequestHandler<QueryUserRequestModel, QueryResponse<IUser>>
    {
        public QueryUsersDatabaseHandler(AccountUnitOfWork unitOfWork)
            : base(unitOfWork.Users)
        {
        }

        public async Task<QueryResponse<IUser>> Handle(QueryUserRequestModel request, CancellationToken cancellationToken)
        {
            return await QuerySearch(request, cancellationToken);
        }

        protected override Expression<Func<User, bool>> DefaultItemFilter(QueryUserRequestModel request)
        {
            if (string.IsNullOrEmpty(request.Search))
            {
                return base.DefaultItemFilter(request);
            }

            return user => user.FullName.Contains(request.Search);
        }

        protected override Expression<Func<User, IUser>> ModelToDto(QueryUserRequestModel request)
        {
            return model => new UserDto
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                FullName = model.FullName,
                Email = model.Email,
                IsActive = model.IsActive,
                Login = model.Login
            };
        }
    }
}
