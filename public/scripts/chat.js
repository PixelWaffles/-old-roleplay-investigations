/*
 * script dependencies
 *
 * jQuery
 * socket.io
 */

$(document).ready( function($) {
  var socket = io();

  var $loginWrap = $('#login-wrap')
    , $chatWrap = $('#chat-wrap')
    , $loginError = $('#login-error-display')
    , $messageForm = $('#send-message')
    , $loginForm = $('#send-login')
    , $usernameBox = $('#username-box')
    , $messageBox = $('#message-box')
    , $messageDisplay = $('#chat-display')
  ;

  // Start in login view.
  $chatWrap.hide();
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

    var message = $messageBox.val();

    socket.emit('message-server', {
      'time': Date.now()
    , 'message': message
    });
    
    $messageBox.val('');
  });

  socket.on('user-login-response', function(_data) {
    if(_data.successful === true) {
      // Switch to chat view.
      $loginWrap.hide();
      $chatWrap.show();
    } else {
      $loginError.text(_data.error);
    }
  });

  socket.on('message-client', function(_data) {
    if(_data.error) {
      $messageDisplay.append('<b>' + _data.error + '</b>' + '<br/>');
      return;
    }

    $messageDisplay.append('<b>' + _data.user + ':' + '</b>' + _data.message + '<br/>');
  });
});
