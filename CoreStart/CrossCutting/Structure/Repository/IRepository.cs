using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace CoreStart.CrossCutting.Structure.Repository
{
    public interface IRepository<TSource> : IAsyncRepository<TSource>
        where TSource : class, IEntity
    {
        IQueryable<TSource> Items { get; }

        void Add(TSource item);

        void Update(TSource item);

        void Remove(long id);

        void Remove(IEnumerable<long> ids);

        IQueryable<TSource> GetRecords();

        IQueryable<TSource> GetRecords(Expression<Func<TSource, bool>> predicate);

        IQueryable<TSource> Query();

        TSource GetRecordById(long id);

        IQueryable<TSource> GetRecordsByIds(IEnumerable<long> ids);

        long Count(Expression<Func<TSource, bool>> predicate);
    }
}
