using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class QueryUsersRequestModel<T>: IRequest<IReadOnlyCollection<T>> where T: IUser
    {
        public QueryUsersRequestModel()
        {
            Page = 0;
            PageSize = 10;
            Search = "";
        }

        public string Search { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }
}
