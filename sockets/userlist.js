var io = require('./io');

function sendUserlistOnConnect(_socket) {
  _socket.emit('userlist', {
    'time': Date.now()
  , 'users': getUserlist()
  });

  return;
};

function getUserlist() {
  var users = [];

  for(socketId in io.engine.clients) {
    var socket = io.sockets.connected[socketId];

    if(socket['$user']) {
      var user = {
        'name': socket['$user']
      };

      users.push(user);
    }
  }

  return users;
};

module.exports = sendUserlistOnConnect;
