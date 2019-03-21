﻿using MediatR;
using Structure.Business.Account.Models;
using System.Collections.Generic;

namespace WebApi.Areas.Account.Models
{
    public class QueryUsersFilterModel : IRequest<IReadOnlyCollection<IUser>>
    {
        public QueryUsersFilterModel()
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
