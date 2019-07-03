
import * as dotenv from 'dotenv';
dotenv.config();

function formatKey(key: string): string {
    const beginKey = "-----BEGIN CERTIFICATE-----";
    const endKey = "-----END CERTIFICATE-----";

    const sanatizedKey = key.replace(beginKey, '').replace(endKey, '').replace('\n', '');

    const keyArray = sanatizedKey.split('').map((l, i) => {
        const position = i + 1;
        const isLastCharacter = sanatizedKey.length === position;

        if (position % 64 === 0 || isLastCharacter) {
            return l + '\n';
        }

        return l;
    })

    return `${beginKey}\n${keyArray.join('')}${endKey}\n`;
}

const jwtPublicTokenKey = process.env.PUBLIC_TOKEN_KEY;
const jwtPrivateTokenKey = process.env.PRIVATE_TOKEN_KEY;
const jwtAuth0TokenKey = formatKey(process.env.AUTH0_TOKEN_KEY);
const cookieSecretKey = process.env.COOKIE_SECRET;
const port = parseInt(process.env.DEV_APP_PORT) || 8011;
const apiPath = process.env.DEV_APP_PATH || '/api';

export const env = process.env.NODE_ENV;
export const jwt = {
    tokenKey: jwtPublicTokenKey,
    privateTokenKey: jwtPrivateTokenKey,
    auth0TokenKey: jwtAuth0TokenKey
};
export const app = { port, apiPath, cookieSecretKey };
