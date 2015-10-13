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
    var parsingCommand = null;
    
    while(true) {
      commandBeginPointer = message.indexOf(this.commandBeginSymbol);
      commandEndPointer = message.indexOf(this.commandEndSymbol, commandBeginPointer);
      
      if(commandBeginPointer === -1) {
        break;
      }
      
      parsingCommand = new rp.msgCmd.Command();
      
      parsingCommand.messageStringIndex = commandBeginPointer;
      parsingCommand.cmd = message.substring( commandBeginPointer + 1, commandEndPointer - 1 );
      message = message.substring( 0, commandBeginPointer ) + message.substring(commandEndPointer);
      commands.push(parsingCommand);
      
      // TODO split parameters from command.
    }
    
    return {
      'message': message
    , 'commands': commands
    };

  };
};
