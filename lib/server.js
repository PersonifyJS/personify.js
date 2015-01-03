var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var extend = require('util')._extend;
var twitter = require('./twitter');

var app = express();

app.use('/', express.static(path.join(__dirname, '../app/public')));
app.use('/', express.static(path.join(__dirname, '../app/views')));
app.use('/', express.static(path.join(__dirname, '../app/util')));
app.use('/', express.static(path.join(__dirname, '../app/controllers')));

app.set('views', __dirname + '../app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  // index.html will be rendered on '/'
});


app.post('/map', function(req, res){
  var res = res;
  console.log('Data received from font-end ==================================================');
  console.log(req.body.geo);
  console.log(req.body.subject);
  console.log('End of data received from font-end ===========================================');
  twitter.twitterData(req, res);
}); 

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
