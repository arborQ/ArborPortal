using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Dtos;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Models.Account;
using MediatR;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class QueryUsersDatabaseHandler : QueryBaseHandler<User, IUser>, IRequestHandler<QueryUsersRequestModel<IUser>, QueryResponse<IUser>>
    {
        public QueryUsersDatabaseHandler(AccountUnitOfWork unitOfWork)
            : base(unitOfWork.Users)
        {
        }

        public Task<QueryResponse<IUser>> Handle(QueryUsersRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            return QuerySearch(request, cancellationToken);
        }

        //protected override Expression<Func<User, bool>> DefaultItemFilter(QueryUsersRequestModel<IUser> request)
        //{
        //    return user => user.FullName.Contains(request.Search);
        //}

        protected override Func<User, IUser> ModelToDto(QueryRequestModel<IUser> request)
        {
            return model =>
            {
                var userDto = new UserDto();

                userDto.Id = model.Id;
                userDto.FirstName = model.FirstName;
                userDto.LastName = model.LastName;
                userDto.FullName = model.FullName;
                userDto.Email = model.Email;
                userDto.IsActive = model.IsActive;
                userDto.Login = model.Login;

                return userDto;
            };
        }
    }
}
