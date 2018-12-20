using MediatR;
using Structure.Business.Account.Models;

namespace WebApi.Areas.Account.Models
{
    public class CreateUserViewModel : BaseUserModel, IUser, IRequest<IUser>
    {

    }
}
