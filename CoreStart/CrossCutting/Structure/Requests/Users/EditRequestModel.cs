using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class EditRequestModel<T> : SingleItemRequestModel<long>, IRequest<EditResponse<T>>, INotification where T : class, IEntity
    {
        public T EditContract { get; set; }
    }
}
