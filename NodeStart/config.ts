
import * as dotenv from 'dotenv';
dotenv.config();

const jwtPublicTokenKey = process.env.PUBLIC_TOKEN_KEY;
const jwtPrivateTokenKey = process.env.PRIVATE_TOKEN_KEY;
const cookieSecretKey = process.env.COOKIE_SECRET;
const port = parseInt(process.env.DEV_APP_PORT) || 8011;
const apiPath = process.env.DEV_APP_PATH || '/api';

export const env = process.env.NODE_ENV;
export const jwt = {
    tokenKey: jwtPublicTokenKey,
    privateTokenKey: jwtPrivateTokenKey
};
export const app = { port, apiPath, cookieSecretKey };
