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
    , $messageForm = $('#send-message')
    , $loginForm = $('#send-login')
    , $usernameBox = $('#username-box')
    , $messageBox = $('#message-box')
    , $messageDisplay = $('#chat-display')
    ;

  var username;

  // Start in login view.
  $chatWrap.hide();
  $loginWrap.show();

  $loginForm.submit(function(_event) {
    _event.preventDefault();

    username = $usernameBox.val();

    // Switch to chat view.
    $loginWrap.hide();
    $chatWrap.show();
  });

  $messageForm.submit(function(_event) {
    _event.preventDefault();

    var message = $messageBox.val();

    if( $usernameBox.val() === '') {
      username = 'anonymous';
    }

    socket.emit('message-server', {
      'time': Date.now()
    , 'user': username
    , 'message': message
    });
    
    $messageBox.val('');
  });

  socket.on('message-client', function(_data) {
    $messageDisplay.append('<b>' + _data.user + ':' + '</b>' + _data.message + '<br/>');
  });
});
