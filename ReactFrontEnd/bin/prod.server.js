var express = require("express");
var proxySettings = require('./proxySettings');
var app = express();

const port = process.env.DEV_APP_PORT;

/* route requests for static files to appropriate directory */
app.use('/content', express.static(__dirname + '/public/content'))

// Set up the proxy.
proxySettings.forEach(setting => {
  app.use(setting);
});

app.listen(port);

console.log("Production server listening on http://localhost:" + port);
