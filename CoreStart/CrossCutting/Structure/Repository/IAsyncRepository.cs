using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Structure.Repository
{
    public interface IAsyncRepository<TSource> where TSource : class, IEntity
    {
        Task AddAsAsync(TSource item);

        Task UpdateAsAsync(TSource item);

        Task<IEnumerable<TSource>> GetRecordsAsAsync();

        Task<IEnumerable<TSource>> GetRecordsAsAsync(Expression<Func<TSource, bool>> predicate);

        Task<TSource> GetRecordAsAsync(Expression<Func<TSource, bool>> predicate);

        Task<TSource> GetRecordByIdAsAsync(long id);

        Task<IEnumerable<TSource>> GetRecordsByIdsAsAsync(IEnumerable<long> ids);

        Task<long> CountAsAsync(Expression<Func<TSource, bool>> predicate);

    }
}
