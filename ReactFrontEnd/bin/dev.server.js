var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("../webpack.config.js");
var compiler = webpack(config);

var port = 8081;

var proxy = {
  target: {
    host: "localhost",
    protocol: "http",
    port: 5000
  },
  bypass: function(req) {
    console.log({ url: req.url });
  },
  onError: function() {
    console.log("error");
  },
  secure: false
};

var server = new webpackDevServer(compiler, {
  historyApiFallback: true, 
  proxy: {
    "/api": proxy
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});

server.listen(port);

console.log("Webpack dev server listen: http://localhost:" + port);
