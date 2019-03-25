using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class QueryRequestModel<T> : IRequest<QueryResponse<T>> where T : class, IEntity
    {
        public QueryRequestModel()
        {
            Page = 0;
            PageSize = 10;
        }

        public int Page { get; set; }

        public int PageSize { get; set; }
    }

    public class QueryUsersRequestModel<T> : QueryRequestModel<T> 
        where T : class, IUser
    {
        public QueryUsersRequestModel()
        {
            Search = "";
        }

        public string Search { get; set; }
    }
}
