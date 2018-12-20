using MediatR;
using Structure.Business.Account.Models;

namespace WebApi.Areas.Account.Models
{
    public class UserViewModel : BaseUserModel, IUser, IRequest<IUser>
    {

    }
}
