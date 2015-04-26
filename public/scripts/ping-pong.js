/*
 * script dependencies
 *
 * jQuery
 * socket.io
 */

$(document).ready( function($) {
  var socket = io();

  $('#button-ping').click( function() {
    socket.emit('ping-server');
  });

  socket.on('pong-client', function(_data) {
    $('#out-pong').append(_data + '<br />');
    $('#out-pong').fadeIn('100').fadeOut('100');
  });
});