using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace NoSqlDatabase
{
    public class MongoRepository<T>
    {
        private readonly IMongoDatabase _mongoDatabase;
        private readonly string _collectionName;

        public MongoRepository(IMongoDatabase mongoDatabase, string collectionName)
        {
            _mongoDatabase = mongoDatabase;
            _collectionName = collectionName;
        }


        public async Task<IEnumerable<T>> GetItems(Expression<Func<T, bool>> filter)
        {
            var items = await _mongoDatabase
                .GetCollection<T>(_collectionName)
                .FindSync(filter)
                .ToListAsync();

            return items;
        }

        public async Task<IEnumerable<T>> GetAllItems()
        {
            return await GetItems(a => true);
        }
    }
}
