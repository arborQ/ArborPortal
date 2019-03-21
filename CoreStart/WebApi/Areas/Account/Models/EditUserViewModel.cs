using CoreStart.CrossCutting.Structure.Business.Account.Models;
using MediatR;
using CoreStart.CrossCutting.Structure.Business.Account.Models;

namespace WebApi.Areas.Account.Models
{
    public class EditUserViewModel : BaseUserModel, IUser, IRequest<IUser>
    {
    }
}
