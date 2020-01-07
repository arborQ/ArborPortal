var dotenv = require('dotenv');
var { cleanEnv, str, url, num, port } = require('envalid');

dotenv.config();

cleanEnv(process.env, {
    FAKE_USER_ID: num(),
    FAKE_USER: str(),
    FAKE_ROLES: str(),
    FAKE_ENDPOINT_PATH: str(),
    PRIVATE_TOKEN_KEY: str(),
    PORT: port()
});

module.exports = {
    userId: +process.env.FAKE_USER_ID,
    userName: process.env.FAKE_USER,
    userRoles: [...process.env.FAKE_ROLES.split(',')],
    PORT: +process.env.PORT,
    enpointPath: process.env.FAKE_ENDPOINT_PATH,
    PRIVATE_TOKEN_KEY: process.env.PRIVATE_TOKEN_KEY,
}