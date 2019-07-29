import { RedisClient } from 'redis';

export default class RedisCache<T> {
    constructor(private name: string, private client: RedisClient) { }

    set<T>(item: T): Promise<void> {
        return new Promise<void>((resolve) => {
            this.client.LPUSH(this.name, JSON.stringify(item), () => {
                resolve();
            });
        });
    }
}