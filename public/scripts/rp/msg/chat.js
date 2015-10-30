// Helper singleton for the easy pushing of messages to message displays.

// Namespace
var rp = rp || {};
rp.msg = rp.msg || {};

// Singleton
rp.msg.chat = new function(){
  "use strict";
  
  this.$chatDisplay = $('#chat-display');
  this.$transcriptDisplay = $('#transcript-display');
  
  this.pushMessage(_channel, _message) {
    if(_channel === 'user' || _channel === 'server') {
      $chatDisplay.append(_message);
    } else if(_channel === 'character') {
      $transcriptDisplay.append(_message);
    }
    return;
  }
};
