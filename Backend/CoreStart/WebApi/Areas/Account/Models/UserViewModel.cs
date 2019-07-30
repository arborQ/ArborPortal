using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Repository;
using MediatR;

namespace WebApi.Areas.Account.Models
{
    public class UserViewModel : BaseUserModel, IUser, IRequest<IUser>, IEntity
    {

    }
}
