// Namespace
var rp = rp || {};
rp.msgCmd = rp.msgCmd || {};

// Class
rp.msgCmd.Command = function(){
  "use strict";
  
  this.cmd = "";
  this.messageStringIndex = -1;
  this.parameters = {};
  
  return;
};
