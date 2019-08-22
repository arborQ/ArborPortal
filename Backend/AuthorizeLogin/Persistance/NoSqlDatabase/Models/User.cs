using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NoSqlDatabase.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonElement("_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("externalId")]
        public string ExternalId { get; set; }

        [BsonElement("login")]
        public string Login { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("roles")]
        public string[] Roles { get; set; }

        [BsonElement("pictureUrl")]
        public string PictureUrl { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }
    }
}
