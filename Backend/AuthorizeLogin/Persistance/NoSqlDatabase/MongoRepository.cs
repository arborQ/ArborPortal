using System.Collections.Generic;
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
        public async Task<IEnumerable<T>> GetAllItems()
        {
            var items = await _mongoDatabase.GetCollection<T>(_collectionName).AsQueryable().ToListAsync();

            return items;
        }
    }
}
