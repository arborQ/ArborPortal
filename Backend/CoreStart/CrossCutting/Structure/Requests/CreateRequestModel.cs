using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests
{
    public class CreateRequestModel<T> : CreateRequestModel<T, T> where T : class
    {
    }

    public class CreateRequestModel<T, R>: IRequest<CreateResponse<R>>, INotification 
        where T : class
        where R : class
    {
        public T NewItem { get; set; }
    }
}
