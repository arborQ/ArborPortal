using Structure.Repository;
using System;
using System.Threading.Tasks;

namespace Structure.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();

        Task CommitAsync();

        IRepository<TEntity> CreateRepository<TEntity>() where TEntity : class, IEntity, new();
    }
}
