/* globals
 * - io
 */

/* script dependencies
 * - jQuery
 * - socket.io
 */

$(document).ready( function($) {
  var socket = io();

  $('#button-ping').click( function() {
    socket.emit('ping-server');
  });

  socket.on('pong-client', function(_data) {
    if(_data.pong){
      $('#out-pong').append('pong <br />');
      $('#out-pong').fadeIn('100').fadeOut('100');
    }
  });
});
