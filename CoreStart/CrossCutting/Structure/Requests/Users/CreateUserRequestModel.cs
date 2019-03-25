using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class CreateUserRequestModel<T> : IRequest<CreateResponse<T>>, INotification where T : class, IUser
    {
        public T CreatedUser { get; set; }
    }
}
