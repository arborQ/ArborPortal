var proxyMiddleware = require('http-proxy-middleware');
const envalid = require('envalid');
const { url, port } = envalid;

const params = {
	DEV_APP_PORT: port({ default: 8000 }),
	PROXY_ACCOUNT: url({ default: 'http://localhost:3000' }),
	PROXY_LOGIN: url({ default: 'http://localhost:3000' }),
	PROXY_RECIPES: url({ default: 'http://localhost:3000' }),
	PROXY_FILES: url({ default: 'http://localhost:3000' })
};

const env = envalid.cleanEnv(process.env, params);

module.exports = env;
