var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("../webpack.config.js");
var compiler = webpack(config);

var port = 8080;

var server = new webpackDevServer(compiler, {
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});

server.listen(port);

console.log("Webpack dev server listen: http://localhost:" + port);
