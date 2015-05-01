var io = require('./io');

function handleMessage(_socket) {
  _socket.on('message-server', function(_data) {
    io.sockets.emit('message-client', {
      'time': Date.now() // Time of Server on Message Sent.
    , 'user': _data.user
    , 'message': _data.message
    });
    return;
  });

  return;
};

module.exports = handleMessage;
