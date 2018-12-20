var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("../webpack.config.js");
var compiler = webpack(config);

var port = 8080;

var server = new webpackDevServer(compiler, {
  bonjour: true,
  historyApiFallback: true,
  inline: true
});

server.listen(port);

console.log("Webpack dev server listen: http://localhost:" + port);
