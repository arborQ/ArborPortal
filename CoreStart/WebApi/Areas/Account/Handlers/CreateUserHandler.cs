﻿using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using Structure.Search;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class CreateUserHandler : IRequestHandler<CreateUserViewModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;
        private readonly ISearchIndexer _searchIndexer;

        public CreateUserHandler(IUsersCoreService usersCoreService, ISearchIndexer searchIndexer)
        {
            _usersCoreService = usersCoreService;
            _searchIndexer = searchIndexer;
        }


        public async Task<IUser> Handle(CreateUserViewModel request, CancellationToken cancellationToken)
        {
            var newUser = _usersCoreService.AddElement(request);

            await _searchIndexer.AddItem(new UserViewModel
            {
                Email = newUser.Email,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                FullName = newUser.FirstName,
                Id = newUser.Id,
                Login = newUser.Login
            }, "xxx");

            return newUser;
        }
    }
}
