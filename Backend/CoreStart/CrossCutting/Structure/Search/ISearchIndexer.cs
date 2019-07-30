using System.Collections.Generic;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Search
{
    public interface ISearchIndexer
    {
        Task AddItem<T>(T item) where T : class, IEntity;

        Task RemoveItem<T>(long itemId) where T : class, IEntity;

        Task<IReadOnlyCollection<T>> GetItems<T>() where T : class, IEntity;

        Task ReIndex<T>(IReadOnlyCollection<T> items) where T : class, IEntity;

        Task EditItem<T>(T item) where T : class, IEntity;
    }
}