using CoreStart.CrossCutting.Structure.Business.Account.Models;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class GetUserRequestModel<T> : SingleItemRequestModel<long>, IRequest<T> where T : class, IUser
    {
    }
}
