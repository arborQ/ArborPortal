using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests
{
    public class SingleItemRequestModel<T> : IRequest<SingleItemResponseModel<T>> where T : class, IEntity
    {
        public long Id { get; set; }
    }
}
