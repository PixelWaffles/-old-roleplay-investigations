// cmdFuncDir is a helper singleton for finding command functions.

// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};

// Singleton
rp.msgCmd.cmdFuncDir = new function() {
  "use strict";
  
  this.findCommandFunction = function(_command) {
    return rp.msgCmd.cmdFunc[_command];
  };
  
  this.executeCommandFunction = function(_parentMessage, _command) {
    var executingCommand = this.findCommandFunction(_command);
    return executingCommand(_parentMessage, _command);
  };
};
