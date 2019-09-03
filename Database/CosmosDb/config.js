var config = {}

config.host = process.env.HOST || "https://arbor-portal-cosmos-db.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "jCtKDk0VPpEpDXBV531X6kDCZZbhCjaYbsj1fVYijSzgE5j3pXu3Vh6FsLfsZz9Npgm2dILqZVVZD7mDA5xmeg==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;