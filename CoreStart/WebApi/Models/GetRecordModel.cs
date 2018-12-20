using MediatR;
using Structure.Business.Account.Models;

namespace WebApi.Models
{
    public class GetRecordModel : IRequest<IUser>
    {
        public long Id { get; set; }

        public static GetRecordModel ById(long id)
        {
            return new GetRecordModel { Id = id };
        }
    }
}
