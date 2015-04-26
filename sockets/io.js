var io = require('socket.io')();

io.on('connection', function(_socket) {
  console.log(
    "Connected from "
    + getClientIp(_socket)
    + ":"
    + getClientPort(_socket)
    + " as id "
    + getClientId(_socket)
    + "."
  );
});

function getClientId(_socket) {
  return _socket.id;
}

function getClientIp(_socket) {
  return _socket.request.connection.remoteAddress;
}

function getClientPort(_socket) {
  return _socket.request.connection.remotePort;
}

module.exports = io;
