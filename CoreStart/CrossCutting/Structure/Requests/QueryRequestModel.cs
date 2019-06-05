using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Users
{
    public class QueryRequestModel<T> : IRequest<QueryResponse<T>> where T : class, IEntity
    {
        public QueryRequestModel()
        {
            Page = 1;
            PageSize = 10;
        }

        public string Search { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public string SortDirection { get; set; }

        public string SortBy { get; set; }
    }
}
