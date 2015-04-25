var express = require('express');
var app = express();
var http = require('http').Server(app);
var consolidate = require('consolidate');

// Server IP
app.set(
  'ip'
, process.env.OPENSHIFT_NODEJS_IP
  || process.env.IP
  || '127.0.0.1'
);

// Server Port
app.set(
  'port'
, process.env.OPENSHIFT_NODEJS_PORT
  || process.env.PORT
  || '3000'
);

// Static Directory
app.use(express.static(path.join(__dirname, '/public')));

// View Engine
app.engine('hjs', consolidate.hogan);
app.set('view engine', 'hjs');
app.set('views', path.join(__dirname, '/views'));

// Loading routes
app.use('/', require('./routes/home'));


http.listen(app.get('port'), app.get('ip'), function() {
  console.log("Server listening on " + app.get('ip') + ":" + app.get('port'));
  return;
});
