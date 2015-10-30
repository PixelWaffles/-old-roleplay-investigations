// A test command function designed to echo display the command's parameters and message string index.

// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};
rp.msgCmd.cmdFunc = rp.msgCmd.cmdFunc || {};

rp.msgCmd.cmdFunc.banana = function(_parentMessage, _commandSelf) {
    var commandsHtml = '';
    
    commandsHtml +=
      '<p>'
    + '<i>'
    + 'Thank you for the banana '
    + _parentMessage.user
    + '! '
    + displayParameters(_commandSelf.parameters)
    + '</i>'
    + '</p>';
    
    rp.msg.chat.pushMessage('user', commandsHtml);
    
    return;
    
    function displayParameters(_parameters) {
      var commandParameterInfo = '';
      
      for(var i = 0; i < _parameters.length; i++) {
        if(i === 0) {
          if(_parameters.length > 1) {
            commandParameterInfo += 'They also sent the following parameters: ';
          } else {
            commandParameterInfo += 'They also sent the following parameter: ';
          }
        } else if(i + 1 === _parameters.length) {
          commandParameterInfo += ' and ';
        } else {
          commandParameterInfo += ', ';
        }
        
        commandParameterInfo += _parameters[i];
      }
      
      if(_parameters.length > 0) {
        commandParameterInfo += '.';
      }
      return commandParameterInfo;
    }
};
