using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Data.Entity.Repository
{
    public abstract class UnitOfWork : IUnitOfWork
    {
        protected DbContext DataBaseContext;

        protected UnitOfWork(DbContext dataBaseContext)
        {
            DataBaseContext = dataBaseContext;
        }

        public IRepository<TEntity> CreateRepository<TEntity>()
            where TEntity : class, IEntity, new()
        {
            return new Repository<TEntity>(DataBaseContext);
        }

        public void Commit()
        {
            DataBaseContext.SaveChanges();
        }

        public async Task CommitAsync()
        {
            await DataBaseContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            if (DataBaseContext != null)
            {
                DataBaseContext.Dispose();
            }
        }
    }
}
