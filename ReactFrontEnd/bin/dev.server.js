var express = require('express');
var webpackConfig = require('../webpack.config');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxySettings = require('./proxySettings');

const port = process.env.DEV_APP_PORT;

var devConfig = webpackConfig.devServer;
var app = express();
var compiler = webpack({ ...webpackConfig, mode: 'development' });

app.use(express.static(devConfig.contentBase || __dirname));
app.use(webpackDevMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));

// Set up the proxy.
proxySettings.forEach(setting => {
  app.use(setting);
});

app.listen(port, function() {
  console.log('Development server listening on http://localhost:' + port);
});
