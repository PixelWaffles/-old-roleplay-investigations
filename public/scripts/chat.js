/* globals
 * - io
 * - rp
 */

/* script dependencies
 * - jQuery
 * - socket.io
 */

$(document).ready( function($) {
  var socket = io();

  var $loginWrap = $('#login-wrap')
    , $appWrap = $('#app-wrap')
    , $loginError = $('#login-error-display')
    , $messageForm = $('#send-message')
    , $characterMessageForm = $('#send-character-message')
    , $characterMessageBox = $('#character-message-box')
    , $loginForm = $('#send-login')
    , $usernameBox = $('#username-box')
    , $messageBox = $('#message-box')
    , $messageDisplay = $('#chat-display')
    , $transcriptDisplay = $('#transcript-display')
    , $userlist = $('#userlist')
  ;

  // Start in login view.
  $appWrap.hide();
  
  $loginWrap.show();

  $loginForm.submit(function(_event) {
    _event.preventDefault();

    socket.emit('user-login', {
      'time': Date.now()
    , 'user': $usernameBox.val()
    });

    
  });

  $messageForm.submit(function(_event) {
    _event.preventDefault();
    sendMessage('user', $messageBox);
    return;
  });
  
  $characterMessageForm.submit(function(_event) {
    _event.preventDefault();
    sendMessage('character', $characterMessageBox);
    return;
  });
  
  $characterMessageBox.keydown(function(_event) {
    if(_event.keyCode === 13) { // If space is pressed.
      _event.preventDefault();
      $characterMessageForm.submit();
    }
    
    return;
  });
  
  function sendMessage(_channel, _$messageBox) {
    var message = rp.msgCmd.parser.parseMessage(_$messageBox.val());
    _$messageBox.val('');
    
    var channelCommand = new rp.msgCmd.Command();
    channelCommand.cmd = 'channel';
    channelCommand.parameters.push(_channel);
    
    message.commands.push(channelCommand);
    message['time'] = Date.now();
    
    socket.emit('message-server', message);
    return;
  }

  // Userlist
  var userlist = new rp.html.ListDiv($userlist.prop('id'), {});
  userlist.initHtml();

  socket.on('user-login-response', function(_data) {
    if(_data.successful === true) {
      // Switch to chat view.
      $loginWrap.hide();
      $appWrap.show();
      
    } else {
      $loginError.text(_data.error);
    }
  });

  socket.on('message-client', function(_data) {
    if(_data.error) {
      $messageDisplay.append('<p>' + '<b>' + _data.error + '</b>' + '</p>');
      return;
    }
    
    if(_data.commands) {
      for(var i = 0; i < _data.commands.length; i++) {
        rp.msgCmd.cmdFuncDir.executeCommandFunction(_data, _data.commands[i]);
      }
    }

    if(_data.message) {
      if(_data.channel === 'user') {
        $messageDisplay.append('<p>' + '<b>' + _data.user + ': ' + '</b>' + _data.message + '</p>');
      } else if(_data.channel === 'character') {
        $transcriptDisplay.append('<p>' + '<b>' + _data.user + ': ' + '</b>' + _data.message + '</p>');
      }
    }
  });

  socket.on('userlist', function(_data) {
    for(var i = 0; i < _data.users.length; i++) {
      userlist.addToList(_data.users[i].name);
    }

    return;
  });

  socket.on('user-signing', function(_data) {
    if(_data.type === 'SIGNIN') {
      userlist.addToList(_data.user);
      $messageDisplay.append('<p>' + '<b>' + _data.user + ' joined' + '</b>' + '</p>');
    } else if (_data.type === 'SIGNOUT') {
      userlist.removeFromList(_data.user);
      $messageDisplay.append('<p>' + '<b>' + _data.user + ' left' + '</b>' + '</p>');
    }
  });
});
