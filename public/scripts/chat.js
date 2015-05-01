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

    var message = $messageBox.val();
    var username = $usernameBox.val();

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
