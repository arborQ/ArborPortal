using MediatR;
using Structure.Business.Account.Models;
using System.Collections.Generic;

namespace WebApi.Areas.Account.Models
{
    public class QueryUsersFilterModel : IRequest<IReadOnlyCollection<IUser>>
    {
    }
}
