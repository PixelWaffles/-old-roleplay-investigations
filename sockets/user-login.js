var io = require('./io');
var events = require('../events');

var escape = require('escape-html');

function login(_user)
{
  if(_user.length <= 0) {
    return {
      'successful': false
    , 'error': 'ERR_EMPTY_USER'
    , 'message': 'User login unsuccessful. User field is empty.'
    };
  }
  for(var socketId in io.engine.clients) {
    var socket = io.sockets.connected[socketId];
    
    if(socket['$user'] === _user) {
      return {
        'successful': false
      , 'error': 'ERR_DUPLICATE_USER'
      , 'message': 'User login unsuccessful. A user with the same name already exist.'
      };
    }
  }

  return {
    'successful': true
  , 'message': 'User '+ _user +' logged in successful.'
  };
}

function handleLogin(_socket) {
  _socket.on('user-login', function(_data) {
    var loginResponse = login(_data.user);

    if(loginResponse.successful === true) {
      _socket['$user'] = _data.user;
      events.emit('user-sign-in-successful', _socket['$user']);
    }

    // Concat time of Server on login response.
    loginResponse.time = Date.now();

    _socket.emit('user-login-response', loginResponse);
    return;
  });

  return;
}

module.exports = handleLogin;
