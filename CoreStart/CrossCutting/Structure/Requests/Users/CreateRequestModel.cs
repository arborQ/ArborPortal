using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class CreateRequestModel<T> : IRequest<CreateResponse<T>>, INotification where T : class
    {
        public T NewItem { get; set; }
    }
}
