using MediatR;
using Structure.Business.Account.Models;

namespace WebApi.Areas.Account.Models
{
    public class EditUserViewModel : BaseUserModel, IUser, IRequest<IUser>
    {
    }
}
