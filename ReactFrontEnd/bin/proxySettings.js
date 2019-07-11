var proxyMiddleware = require('http-proxy-middleware');

module.exports = [
    proxyMiddleware(`http://localhost:${process.env.PROXY_ACCOUNT_PORT}/api/account/**`),
    proxyMiddleware(`http://localhost:${process.env.PROXY_RECIPES_PORT}/api/recipes/**`),
];