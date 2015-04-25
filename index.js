var app = require('express')();
var http = require('http').Server(app);

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


http.listen(app.get('port'), app.get('ip'), function() {
  console.log("Server listening on " + app.get('ip') + ":" + app.get('port'));
  return;
});
