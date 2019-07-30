using Structure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repository
{
    internal class Repository<TSource> : IRepository<TSource>
        where TSource : IEntity
    {
        public long Add(TSource item)
        {
            throw new NotImplementedException();
        }

        public TSource Edit(long id, Func<TSource, TSource> modify)
        {
            throw new NotImplementedException();
        }

        public TSource Edit(TSource item, Func<TSource, TSource> modify)
        {
            throw new NotImplementedException();
        }

        public TSource GetRecordById(long id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TSource> GetRecords()
        {
            throw new NotImplementedException();
        }

        public IQueryable<TSource> GetRecords(Expression<Func<TSource, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TSource> GetRecordsByIds(IEnumerable<long> ids)
        {
            throw new NotImplementedException();
        }

        public void Remove(long id)
        {
            throw new NotImplementedException();
        }

        public void Remove(IEnumerable<long> ids)
        {
            throw new NotImplementedException();
        }
    }
}
