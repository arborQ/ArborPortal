
import * as dotenv from 'dotenv';
import { cleanEnv, str, port as isPort, url } from 'envalid';
dotenv.config();

cleanEnv(process.env, {
    DEV_APP_PORT: isPort(),
    DEV_APP_PATH: str(),
    MONGO_CONNECTION_STRING: url(),
});

export const port: number = +process.env.DEV_APP_PORT;
export const apiPath: string = process.env.DEV_APP_PATH;
export const mongoConnectionString: string = process.env.MONGO_CONNECTION_STRING;
