import 'dotenv/config';
import { cleanEnv, str, port as isPort, url } from 'envalid';
import { Injectable } from '@nestjs/common';

cleanEnv(process.env, {
    DEV_APP_PORT: isPort(),
    DEV_APP_PATH: str(),
    MONGO_CONNECTION_STRING: url(),
});

@Injectable()
export class Config {
    port: number = +process.env.DEV_APP_PORT;
    mongoConnectionString: string = process.env.MONGO_CONNECTION_STRING;
}
