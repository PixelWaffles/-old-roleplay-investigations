var io = require('./io');

var escape = require('escape-html');

function handleMessage(_socket) {
  _socket.on('message-server', function(_data) {

    io.sockets.emit('message-client', {
      'time': Date.now() // Time of Server on Message Sent.
    , 'user': escape(_socket['$user'])
    , 'message': escape(_data.message)
    });
    return;
  });

  return;
};

module.exports = handleMessage;
