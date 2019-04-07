using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class DeleteRequestModel<T> : SingleItemRequestModel<long>, IRequest<DeleteResponse<T>>, INotification where T : class, IEntity
    {
    }
}
