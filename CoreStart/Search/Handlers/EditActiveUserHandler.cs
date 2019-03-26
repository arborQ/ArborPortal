using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Search;
using MediatR;

namespace CoreStart.Data.Search.Handlers
{
    //public class EditActiveUserHandler : INotificationHandler<EditUserRequestModel<IUser>>
    //{
    //    private readonly ISearchIndexer _searchIndexer;
    //    private readonly IMediator _mediator;

    //    public EditActiveUserHandler(ISearchIndexerFactory searchIndexerFactory, IMediator mediator)
    //    {
    //        _searchIndexer = searchIndexerFactory.GetSearchIndexer("activeusers");
    //        _mediator = mediator;
    //    }

    //    public async Task Handle(EditUserRequestModel<IUser> notification, CancellationToken cancellationToken)
    //    {
    //        if (notification.EditUser.IsActive)
    //        {
    //            await _searchIndexer.EditItem(notification.EditUser);
    //        }
    //        else
    //        {
    //            await _mediator.Publish(new DeleteUserRequestModel<IUser> { Id = notification.Id });
    //        }
    //    }
    //}
}
