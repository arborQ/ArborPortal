using Microsoft.EntityFrameworkCore;
using Structure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.Entity.Repository
{
    internal class Repository<TSource> : IRepository<TSource>
        where TSource : class, IEntity
    {
        protected DbContext DataBaseContext;
        private DbSet<TSource> dbSet;

        public IQueryable<TSource> Items => dbSet;

        public Repository(DbContext dataBaseContext)
        {
            DataBaseContext = dataBaseContext;
            dbSet = dataBaseContext.Set<TSource>();
        }

        public void Add(TSource item)
        {
            dbSet.Add(item);
        }

        public TSource GetRecordById(long id)
        {
            return dbSet.Single(e => e.Id == id);
        }

        public IQueryable<TSource> GetRecords()
        {
            return dbSet.AsNoTracking().AsQueryable();
        }

        public IQueryable<TSource> GetRecords(Expression<Func<TSource, bool>> predicate)
        {
            return dbSet.AsNoTracking().Where(predicate);
        }

        public IQueryable<TSource> GetRecordsByIds(IEnumerable<long> ids)
        {
            return GetRecords(e => ids.Contains(e.Id));
        }

        public void Remove(long id)
        {
            var record = GetRecordById(id);

            dbSet.Remove(record);
        }

        public void Remove(IEnumerable<long> ids)
        {
            var records = GetRecordsByIds(ids);

            dbSet.RemoveRange(records);
        }

        public void Update(TSource item)
        {
            DataBaseContext.Entry(item).State = EntityState.Modified;
        }

        public async Task AddAsAsync(TSource item)
        {
            await dbSet.AddAsync(item);
        }

        public async Task<TSource> GetRecordByIdAsAsync(long id)
        {
            return await dbSet.SingleAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<TSource>> GetRecordsAsAsync()
        {
            return await dbSet.ToListAsync();
        }
        public async Task<IEnumerable<TSource>> GetRecordsAsAsync(Expression<Func<TSource, bool>> predicate)
        {
            return await dbSet.Where(predicate).ToListAsync();
        }

        public Task<IEnumerable<TSource>> GetRecordsByIdsAsAsync(IEnumerable<long> ids)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsAsync(TSource item)
        {
            throw new NotImplementedException();
        }

        public async Task<TSource> GetRecordAsAsync(Expression<Func<TSource, bool>> predicate)
        {
            return await dbSet.SingleAsync(predicate);
        }

        public long Count(Expression<Func<TSource, bool>> predicate)
        {
            return dbSet.Count(predicate);
        }

        public async Task<long> CountAsAsync(Expression<Func<TSource, bool>> predicate)
        {
            return await dbSet.CountAsync(predicate);
        }
    }
}
