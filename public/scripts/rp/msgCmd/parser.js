// This parser is responsible for converting user input in-text message commands into server read commands.

// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};

// Singleton
rp.msgCmd.parser = new function() {
  "use strict";
  
  this.commandBeginSymbol = '[';
  this.commandEndSymbol = ']';
  
  this.parseMessage = function(_message) {
    var message = _message;
    var commands = [];
    
    var commandEndPointer = -1;
    var commandBeginPointer = -1;
    
    while(true) {
      commandBeginPointer = message.indexOf(this.commandBeginSymbol);
      commandEndPointer = message.indexOf(this.commandEndSymbol, commandBeginPointer);
      
      if(commandBeginPointer === -1) {
        break;
      }
      
      var commandTag = '';
      
      //extract command tags from message.
      if(commandEndPointer === -1){
        commandTag = message.substring(commandBeginPointer + 1);
        message = message.substring(0, commandBeginPointer);
      } else {
        commandTag = message.substring(commandBeginPointer + 1, commandEndPointer);
        message = message.substring(0, commandBeginPointer) + message.substring(commandEndPointer + 1);
      }
      
      commands.push( commandFromCommandTag(commandTag) );
    }
    
    return {
      'message': message
    , 'commands': commands
    };
    
    function commandFromCommandTag(_commandTag) {
      var returningCommand = new rp.msgCmd.Command();
      var commandTagElements = _commandTag.split(' ');
      
      for(var i = 0; i < commandTagElements.length; i++) {
        if(i === 0) {
          returningCommand.cmd = commandTagElements[i];
        } else {
          returningCommand.parameters.push(commandTagElements[i]);
        }
      }
      
      return returningCommand;
    }

  };
};
