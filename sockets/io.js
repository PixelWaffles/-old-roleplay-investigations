var io = require('socket.io')();

io.on('connection', function(_socket) {
  console.log("A user has connected.");
});

module.exports = io;
