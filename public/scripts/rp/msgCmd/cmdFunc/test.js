// A test command function designed to echo display the command's parameters and message string index.

// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};
rp.msgCmd.cmdFunc = rp.msgCmd.cmdFunc || {};

rp.msgCmd.cmdFunc.test = function(_parentMessage, _commandSelf) {
    var commandsHtml = '';
    
    commandsHtml +=
      '<p>'
    + '<i>'
    + 'Command '
    + _commandSelf.cmd
    + ' received from '
    + _parentMessage.user
    + ' '
    + displayParameters(_commandSelf.parameters)
    + '.'
    + '</i>'
    + '</p>';
    
    return commandsHtml;
    
    function displayParameters(_parameters) {
      var commandParameterInfo = '';
      
      for(var i = 0; i < _parameters.length; i++) {
        if(i === 0) {
          commandParameterInfo += 'with parameters ';
        } else if(i + 1 === _parameters.length) {
          commandParameterInfo += ' and ';
        } else {
          commandParameterInfo += ', ';
        }
        
        commandParameterInfo += _parameters[i];
      }
      
      return commandParameterInfo;
    }
};
