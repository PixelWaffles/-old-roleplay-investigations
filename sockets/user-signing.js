var io = require('./io');
var events = require('../events');

events.on('user-sign-in-successful', broadcastSignInSuccessful);

function broadcastSigning(_socket) {
  // Empty
  return;
};

function broadcastSignInSuccessful(_user) {
  io.sockets.emit('user-signing', {
    'time': Date.now()
  , 'user': _user
  , 'type': 'SIGNIN'
  });

  console.log("User " + _user + " signed in successful.");

  return;
};

module.exports = broadcastSigning;
