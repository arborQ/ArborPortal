import { createClient } from 'redis';
import RedisCache from './baseCacheRepository';
import { database } from '@bx-config';

const client = createClient({ password: database.redisPassword });

client.on("error", function (err) {
    console.log("Error " + err);
});

export const blackListedSessions = new RedisCache<string>('blackListedSessions', client);
