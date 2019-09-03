import { CosmosClient, Database, Container, Item } from '@azure/cosmos';


async function createDatabase(client: CosmosClient, databaseId: string): Promise<Database> {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    console.log(`Created database: ${database.id}`);

    return database;
}

async function createContainer(database: Database, containerId: string): Promise<Container> {
    const { container } = await database.containers.createIfNotExists(
        {
            id: containerId,
            partitionKey: {
                paths: ['/Country']
            }
        },
        { offerThroughput: 400 });

    console.log(`Created container: ${containerId}`);

    return container;
}

async function createItem(container: Container, itemBody: any): Promise<Item> {
    const { item } = await container
        .items
        .upsert(itemBody);

    console.log(`Created family item with id: ${itemBody.id}`);

    return item;
};

export default async function createRepository<T>(databaseName: string, containerName: string) {
    const { CosmosConnectionString } = process.env;

    const client = new CosmosClient(CosmosConnectionString);
    const database = await createDatabase(client, databaseName);
    const container = await createContainer(database, containerName);

    return {
        create: async (item: T) => await createItem(container, item)
    }
}
