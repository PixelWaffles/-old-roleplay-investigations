var io = require('./io');

var escape = require('escape-html');
var _ = require('underscore')

function handleMessage(_socket) {
  _socket.on('message-server', function(_data) {

    if(!_socket['$user']) {
      _socket.emit('message-client', {
        'time': Date.now()
      , 'channel': 'server'
      , 'error': 'ERR_NOT_LOGGED_IN'
      });
      
      return;
    }
    
    var messageToBroadcast = createMessageToBroadcast();
    
    

    io.sockets.emit('message-client', messageToBroadcast);
    return;
    
    function createMessageToBroadcast() {
      return {
        'time': Date.now() // Time of Server on Message Sent.
      , 'user': escape(_socket['$user'])
      , 'message': escape(_data.message)
      , 'commands': _data.commands
      };
    }
  });

  return;
}

module.exports = handleMessage;
