import * as dotenv from 'dotenv';
import { cleanEnv, url, port, str } from 'envalid';
dotenv.config();

cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: url(),
    ELASTIC_SEARCH_URL: url(),
    RABITMQ_URL: str(),
    PORT: port(),
});

class ConfigService {
    mongoConnectionString: string;
    elasticSearchUrl: string;
    queueUrl: string;
    port: number;
    constructor() {
        this.mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
        this.elasticSearchUrl = process.env.ELASTIC_SEARCH_URL;
        this.port = +process.env.PORT;
        this.queueUrl = process.env.RABITMQ_URL;
    }
}

export default new ConfigService();
