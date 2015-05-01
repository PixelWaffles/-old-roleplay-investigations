/*
 * script dependencies
 *
 * jQuery
 * socket.io
 */

$(document).ready( function($) {
  var socket = io();

  var $messageForm = $('#send-message')
    , $usernameBox = $('#username-box')
    , $messageBox = $('#message-box')
    , $messageDisplay = $('#chat-display')
    ;

  $messageForm.submit(function(_event) {
    _event.preventDefault();

    var message;

    if( $usernameBox.val() === '') {
      message = '<b>' + 'anonymous' + ': ' + '</b>' + $messageBox.val();
    } else {
      message = '<b>' + $usernameBox.val() + ': ' + '</b>' + $messageBox.val();
    }

    socket.emit('message-server', {
      'time': Date.now()
    , 'message': message
    });
    
    $messageBox.val('');
  });

  socket.on('message-client', function(_data) {
    $messageDisplay.append(_data.message + '<br/>');
  });
});
