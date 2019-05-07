using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Strategies.Persistence;

namespace CoreStart.CrossCutting.Structure.Factories
{
    public interface ICreateItemStrategyFactory
    {
        ICreateItemStrategy<TModel, T> CreateDatabaseItemStrategy<TModel, T>() where TModel : class, IEntity, new();
    }
}
