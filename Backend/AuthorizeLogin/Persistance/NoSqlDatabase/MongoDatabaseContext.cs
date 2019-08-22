using MongoDB.Driver;
using NoSqlDatabase.Models;

namespace NoSqlDatabase
{
    public class MongoDatabaseContext
    {
        private IMongoDatabase _database;

        public MongoDatabaseContext()
        {
            var databaseUrl = "mongodb://localhost:27017";
            var databaseName = "PortalDatabase";

            var client = new MongoClient(databaseUrl);

            _database = client.GetDatabase(databaseName);

            Users = new MongoRepository<User>(_database, "users");
        }

        public MongoRepository<User>Users { get; set; }
    }
}
