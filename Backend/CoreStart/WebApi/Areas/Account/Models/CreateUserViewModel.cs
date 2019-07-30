using CoreStart.CrossCutting.Structure.Business.Account.Models;
using MediatR;

namespace WebApi.Areas.Account.Models
{
    public class CreateUserViewModel : BaseUserModel, IUser, IRequest<IUser>
    {

    }
}
