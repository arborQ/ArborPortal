using MediatR;

namespace WebApi.Areas.Account.Models
{
    public class DeleteUserViewModel : IRequest<long>
    {
        public long Id { get; set; }
    }
}
