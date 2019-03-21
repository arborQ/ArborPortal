using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using Structure.Business.Account.Models;

namespace Structure.Requests.Users
{
    internal class QueryUsersRequestModel<T>: IRequest<IReadOnlyCollection<T>> where T: IUser
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
