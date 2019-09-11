using AuthorizeLogin.Areas.Accounts.Responses;
using MediatR;

namespace AuthorizeLogin.Areas.Accounts.Models
{
    public class GetUsersRequest : IRequest<GetUsersResponse>
    {
        public string SortBy { get; set; }

        public string SortDirection { get; set; }
    }
}
