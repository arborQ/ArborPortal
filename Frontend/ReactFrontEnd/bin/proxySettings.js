var proxyMiddleware = require("http-proxy-middleware");

module.exports = [
  proxyMiddleware(`${process.env.PROXY_ACCOUNT}/api/account/**`),
  proxyMiddleware(`${process.env.PROXY_LOGIN}/api/authorize/login**`),
  proxyMiddleware(`${process.env.PROXY_LOGIN}/api/users/user**`),
  proxyMiddleware(`${process.env.PROXY_RECIPES}/api/recipes**`),
  // proxyMiddleware(`${process.env.WEB_SOCKET}/socket.io/**`, { ws: true, logLevel: 'debug' })
];