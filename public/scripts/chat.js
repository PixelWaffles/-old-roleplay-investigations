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
    , $loginForm = $('#send-login')
    , $usernameBox = $('#username-box')
    , $messageBox = $('#message-box')
    , $messageDisplay = $('#chat-display')
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

    var message = rp.msgCmd.parser.parseMessage( '[channel user]' + $messageBox.val() );
    message['time'] = Date.now();

    socket.emit('message-server', message);
    
    $messageBox.val('');
  });

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
        $messageDisplay.append( rp.msgCmd.cmdFuncDir.executeCommandFunction(_data, _data.commands[i]) );
      }
    }

    if(_data.message) {
      if(_data.channel === 'user') {
        $messageDisplay.append('<p>' + '<b>' + _data.user + ': ' + '</b>' + _data.message + '</p>');
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
