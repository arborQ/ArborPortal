var proxyMiddleware = require('http-proxy-middleware');
var env = require('./settings');

module.exports = [
	proxyMiddleware(`${env.PROXY_ACCOUNT}/api/account/**`),
	proxyMiddleware(`${env.PROXY_LOGIN}/api/authorize/login**`),
	proxyMiddleware(`${env.PROXY_LOGIN}/api/accounts/user**`),
	proxyMiddleware(`${env.PROXY_RECIPES}/api/recipes**`),
	proxyMiddleware(`${env.PROXY_FILES}/api/files/**`)
	// proxyMiddleware(`${process.env.WEB_SOCKET}/socket.io/**`, { ws: true, logLevel: 'debug' })
];
