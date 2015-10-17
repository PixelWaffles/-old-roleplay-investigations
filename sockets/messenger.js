var io = require('./io');

var escape = require('escape-html');

function handleMessage(_socket) {
  _socket.on('message-server', function(_data) {

    if(!_socket['$user']) {
      _socket.emit('message-client', {
        'time': Date.now()
      , 'error': 'ERR_NOT_LOGGED_IN'
      });
      
      return;
    }

    io.sockets.emit('message-client', {
      'time': Date.now() // Time of Server on Message Sent.
    , 'user': escape(_socket['$user'])
    , 'message': escape(_data.message)
    });
    return;
  });

  return;
}

module.exports = handleMessage;
