import { RedisClient } from 'redis';

export default class RedisCache<T> {
    constructor(private name: string, private client: RedisClient) { }

    set<T>(item: T, expireIn?: number): Promise<void> {
        return new Promise<void>((resolve) => {
            const value = typeof item === 'string' ? item : JSON.stringify(item);
            const key = `${this.name}_${value}`;
            this.client.set(key, value);
            if (expireIn !== undefined) {
                this.client.expire(key, expireIn, () => resolve());
            } else {
                resolve();
            }
        });
    }

    remove(item: T): Promise<void> {
        const value = typeof item === 'string' ? item : JSON.stringify(item);
        const key = `${this.name}_${value}`;

        return new Promise<void>(resolve => {
            this.client.del(key, () => resolve());
        });
    }

    contains(item: T): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const value = typeof item === 'string' ? item : JSON.stringify(item);
            const key = `${this.name}_${value}`;
            this.client.get(key, (_, reply) => {
                resolve(!!reply);
            });
        });
    }
}