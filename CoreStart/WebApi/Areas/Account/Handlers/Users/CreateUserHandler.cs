using MediatR;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using Structure.Search;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers.Users
{
    public class CreateUserHandler : IRequestHandler<CreateUserViewModel, IUser>
    {
        private readonly IUsersCoreService _usersCoreService;
        private readonly ISearchIndexer _searchIndexer;

        public CreateUserHandler(IUsersCoreService usersCoreService, ISearchIndexerFactory searchIndexerFactory)
        {
            _usersCoreService = usersCoreService;
            _searchIndexer = searchIndexerFactory.GetSearchIndexer("users");
        }

        public async Task<IUser> Handle(CreateUserViewModel request, CancellationToken cancellationToken)
        {
            var newUser = _usersCoreService.AddElement(request);

            if (newUser.IsActive)
            {
                await _searchIndexer.AddItem(newUser);
            }

            return await Task.FromResult(newUser);
        }
    }
}
