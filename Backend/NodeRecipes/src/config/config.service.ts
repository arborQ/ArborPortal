import * as dotenv from 'dotenv';
import { cleanEnv, url, port } from 'envalid';
dotenv.config();

cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: url(),
    ELASTIC_SEARCH_URL: url(),
    PORT: port(),
});

class ConfigService {
    mongoConnectionString: string;
    elasticSearchUrl: string;
    port: number;
    constructor() {
        this.mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
        this.elasticSearchUrl = process.env.ELASTIC_SEARCH_URL;
        this.port = +process.env.PORT;
    }
}

export default new ConfigService();
