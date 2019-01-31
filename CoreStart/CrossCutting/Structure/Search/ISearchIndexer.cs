using System.Collections.Generic;
using System.Threading.Tasks;

namespace Structure.Search
{
    public interface ISearchIndexer
    {
        Task AddItem<T>(T item, string indexName) where T : class;

        Task AddItem<T>(T item) where T : class;

        Task<IReadOnlyCollection<T>> GetItems<T>() where T : class;

        Task<IReadOnlyCollection<T>> GetItems<T>(string index) where T : class;
    }
}
