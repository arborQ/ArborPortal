﻿using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using Structure.Search;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class EditUserHandler : IRequestHandler<EditUserViewModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;
        private readonly ISearchIndexer _searchIndexer;

        public EditUserHandler(IUsersCoreService usersCoreService, ISearchIndexer searchIndexer)
        {
            _usersCoreService = usersCoreService;
            _searchIndexer = searchIndexer;
        }

        public Task<IUser> Handle(EditUserViewModel request, CancellationToken cancellationToken)
        {
            var user = _usersCoreService.EditElement(request.Id, request);

            if (user.IsActive)
            {
                _searchIndexer.EditItem(user);
            }
            else
            {
                _searchIndexer.RemoveItem<IUser>(user.Id);
            }

            return Task.FromResult(user);
        }
    }
}
