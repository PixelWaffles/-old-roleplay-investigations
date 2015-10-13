// This parser is responsible for converting user input in-text message commands into server read commands.

// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};

// Singleton
rp.msgCmd.parser = new function() {
  "use strict";
  
  this.parseMessage = function(_message) {
    var message = _message;
    var commands = [];
    
    // TODO Write parser.
    
    return {
      message: message,
      commands: commands
    };

  };
};
