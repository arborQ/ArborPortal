import dotenv from 'dotenv';
import { cleanEnv, str, port, url } from 'envalid';
dotenv.config();

cleanEnv(process.env, {
    DEV_APP_PORT: port(),
    QUEUE_URL: url()
});

export const app_port = parseInt(process.env.DEV_APP_PORT);
export const queue_url = process.env.QUEUE_URL;