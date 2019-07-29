import { createClient } from 'redis';
import RedisCache from './baseCacheRepository';

const client = createClient({});

client.on("error", function (err) {
    console.log("Error " + err);
});

export const blackListedSessions = new RedisCache<string>('blackListedSessions', client);
