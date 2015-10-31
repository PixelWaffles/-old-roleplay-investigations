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
    getMessageChannel();
    
    

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
    
    function getMessageChannel() {
      var channelCommand = _.find(messageToBroadcast.commands, function(_command){return _command.cmd === 'channel'});
      var allowedChannels = ['user', 'character', 'stage'];
      
      if( channelCommand && _.contains(allowedChannels, channelCommand.parameters[0]) ) {
        messageToBroadcast['channel'] = channelCommand.parameters[0];
      }
      
      messageToBroadcast.commands = _.filter(messageToBroadcast.commands, function(_command){return _command.cmd !== 'channel'});
      return;
    }
  });

  return;
}

module.exports = handleMessage;
