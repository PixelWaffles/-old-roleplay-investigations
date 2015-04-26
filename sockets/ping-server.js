var io = require('./io');

function handlePing(_socket) {
  _socket.on('ping-server', function(_data) {
    _socket.emit('pong-client', "pong");
    return;
  });

  return;
};

module.exports = handlePing;
