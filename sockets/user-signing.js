var io = require('./io');
var events = require('../events');

events.on('user-sign-in-successful', broadcastSignInSuccessful);

function broadcastSigning(_socket) {
  _socket.on('disconnect', function() {
    if(_socket['$user']) {
      broadcastSignOut(_socket['$user']);
    }
    return;
  });
  return;
}

function broadcastSignInSuccessful(_user) {
  io.sockets.emit('user-signing', {
    'time': Date.now()
  , 'user': _user
  , 'type': 'SIGNIN'
  });

  console.log("User " + _user + " signed in successful.");

  return;
}

function broadcastSignOut(_user) {
  io.sockets.emit('user-signing', {
    'time': Date.now()
  , 'user': _user
  , 'type': 'SIGNOUT'
  });

  console.log("User " + _user + " signed out.");

  return;
}

module.exports = broadcastSigning;
