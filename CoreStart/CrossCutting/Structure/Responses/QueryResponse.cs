using System.Collections.Generic;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class QueryResponse<TModel> where TModel: class
    {
        public IReadOnlyCollection<TModel> Items { get; set; }

        public long TotalCount { get; set; } 
    }
}
