using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class DeleteRequestModel<T> : IRequest<DeleteResponse<T>>, INotification where T : class, IEntity
    {
        public long Id { get; set; }
    }
}
