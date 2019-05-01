using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Strategies.Persistence;

namespace CoreStart.CrossCutting.Structure.Factories
{
    public interface ICreateItemStrategyFactory
    {
        ICreateItemStrategy<TModel, T> CreateDatabaseItemStrategy<TModel, T>(IRepository<TModel> repository, IEnumerable<IValidator<TModel>> validators) where TModel : class, IEntity, new();
    }
}
