using AuthorizeLogin.Areas.Accounts.Models;
using AuthorizeLogin.Areas.Accounts.Responses;
using AuthorizeLogin.Persistance.Database;
using AuthorizeLogin.Persistance.Database.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace AuthorizeLogin.Areas.Accounts.Handlers
{
    public class GetUsersHandler : IRequestHandler<GetUsersRequest, GetUsersResponse>
    {
        private readonly IDatabaseContext _databaseContext;

        public GetUsersHandler(IDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<GetUsersResponse> Handle(GetUsersRequest request, CancellationToken cancellationToken)
        {
            var users =
                request.SortDirection == "asc" 
                ? _databaseContext.Users
                    .OrderBy(GetOrderByExpression(request.SortBy))
                : _databaseContext.Users
                    .OrderByDescending(GetOrderByExpression(request.SortBy));

            var usersModels = await users.Select(u => new AccountModel
            {
                Id = u.Id,
                Login = u.UserName,
                Email = u.EmailAddress,
                FirstName = u.FirstName,
                LastName = u.LastName,
                IsActive = true
            }).ToListAsync();

            return new GetUsersResponse { Accounts = usersModels, IsSuccessfull = true };
        }

        private Expression<Func<User, string>> GetOrderByExpression(string orderBy)
        {
            switch(orderBy)
            {
                case nameof(AccountModel.Login):
                    return u => u.UserName;
                case nameof(AccountModel.Email):
                    return u => u.EmailAddress;
                default:
                    return u => u.EmailAddress;
            }
        }
    }
}
