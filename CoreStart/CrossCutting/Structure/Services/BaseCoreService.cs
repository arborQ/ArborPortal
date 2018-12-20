using Structure.Repository;
using Structure.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Structure.Services
{
    public abstract class BaseCoreService<TInterface, TEntity>
        where TInterface : class
        where TEntity : class, IEntity, new()
    {
        protected IUnitOfWork UnitOfWork;
        protected BaseCoreService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        protected virtual Expression<Func<TEntity, bool>> FilterExpression()
        {
            return a => true;
        }

        public long Count()
        {
            var filterExpression = FilterExpression();

            return UnitOfWork.CreateRepository<TEntity>().Count(filterExpression);
        }


        public TInterface GetElement(long id)
        {
            var record = UnitOfWork.CreateRepository<TEntity>().GetRecordById(id);

            return MapFromEntity(record);
        }

        public IReadOnlyCollection<TInterface> GetElements()
        {
            var filterExpression = FilterExpression();

            var records = UnitOfWork.CreateRepository<TEntity>().GetRecords(filterExpression);

            return records.ToList().Select(MapFromEntity).ToList();
        }

        public TInterface EditElement(long id, TInterface contract)
        {
            var repository = UnitOfWork.CreateRepository<TEntity>();
            var mapper = MapFromInterface(contract);
            var entity = mapper(repository.GetRecordById(id));

            repository.Update(entity);

            UnitOfWork.Commit();

            return MapFromEntity(entity);
        }

        public TInterface AddElement(TInterface contract)
        {
            var mapper = MapFromInterface(contract);
            var entity = mapper(new TEntity());
            var repository = UnitOfWork.CreateRepository<TEntity>();

            repository.Add(entity);
            UnitOfWork.Commit();

            return MapFromEntity(entity);
        }

        public async Task RemoveAsync(IReadOnlyCollection<long> ids)
        {
            var repository = UnitOfWork.CreateRepository<TEntity>();

            repository.Remove(ids);

            await UnitOfWork.CommitAsync();
        }

        public void Remove(IReadOnlyCollection<long> ids)
        {
            var repository = UnitOfWork.CreateRepository<TEntity>();

            repository.Remove(ids);
        }

        protected virtual Func<TEntity, TEntity> MapFromInterface(TInterface contract)
        {
            return e => e;
        }

        protected abstract TInterface MapFromEntity(TEntity entity);
    }
}
