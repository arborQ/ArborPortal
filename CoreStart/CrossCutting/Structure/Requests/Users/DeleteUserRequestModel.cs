using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class DeleteUserRequestModel<T> : SingleItemRequestModel<long>, IRequest<DeleteResponse<T>>, INotification where T : class, IUser
    {
    }
}
