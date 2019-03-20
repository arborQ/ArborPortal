using MediatR;
using Structure.Business.Account.Models;
using Structure.Repository;

namespace WebApi.Areas.Account.Models
{
    public class UserViewModel : BaseUserModel, IUser, IRequest<IUser>, IEntity
    {

    }
}
