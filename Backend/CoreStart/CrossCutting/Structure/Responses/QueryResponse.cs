using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class QueryResponse<TModel> where TModel: class, IEntity
    {
        public IReadOnlyCollection<TModel> Items { get; set; }

        public long TotalCount { get; set; } 
    }
}
