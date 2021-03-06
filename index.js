var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var consolidate = require('consolidate');

// Server IP
app.set(
  'ip'
, process.env.IP
  || process.env.OPENSHIFT_NODEJS_IP
  || '0.0.0.0'
);

// Server Port
app.set(
  'port'
, process.env.PORT
  || process.env.OPENSHIFT_NODEJS_PORT
  || '3000'
);

// Express Boilerplate
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// Style Pre-processor
var lessMiddleware = require('less-middleware');
app.use(lessMiddleware(path.join(__dirname, '/public')));

// View Engine
app.engine('hjs', consolidate.hogan);
app.set('view engine', 'hjs');
app.set('views', path.join(__dirname, '/views'));

// Loading routes
app.use('/', require('./routes/home'));
require('./sockets/io').attach(http);

// Static Directory
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/public')));


http.listen(app.get('port'), app.get('ip'), function() {
  console.log("Server listening on " + app.get('ip') + ":" + app.get('port'));
  return;
});
