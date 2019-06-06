var express = require("express");
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var app = express();
var port = 8080;

var serverProxy = 'http://localhost:5000';

/* route requests for static files to appropriate directory */
app.use('/content', express.static(__dirname + '/public/content'))

app.get('/api/*', function (req, res) {
  console.log('redirecting to ' + serverProxy);
  apiProxy.web(req, res, { target: serverProxy });
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(port);

console.log("Webpack dev server listen: http://localhost:" + port);
