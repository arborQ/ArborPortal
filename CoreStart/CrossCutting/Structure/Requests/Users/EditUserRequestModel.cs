using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class EditUserRequestModel<T> : SingleItemRequestModel<long>, IRequest<EditResponse<T>>, INotification where T : class, IUser
    {
        public T EditUser { get; set; }
    }
}
