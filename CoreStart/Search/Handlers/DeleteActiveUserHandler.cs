using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Search;
using MediatR;

namespace CoreStart.Data.Search.Handlers
{
    public class DeleteActiveUserHandler : INotificationHandler<DeleteUserRequestModel<IUser>>
    {
        private readonly ISearchIndexer _searchIndexer;

        public DeleteActiveUserHandler(ISearchIndexerFactory searchIndexerFactory)
        {
            _searchIndexer = searchIndexerFactory.GetSearchIndexer("activeusers");
        }

        public async Task Handle(DeleteUserRequestModel<IUser> notification, CancellationToken cancellationToken)
        {
            await _searchIndexer.RemoveItem<IUser>(notification.Id);
        }
    }
}
