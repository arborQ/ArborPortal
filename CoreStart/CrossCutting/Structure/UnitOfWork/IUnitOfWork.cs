using System;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();

        Task CommitAsync();

        IRepository<TEntity> CreateRepository<TEntity>() where TEntity : class, IEntity, new();
    }
}
