var io = require('./io');

var escape = require('escape-html');

function login(_user)
{
  if(_user.length <= 0) {
    return {
      'successful': false
    , 'error': 'EMPTY_USER'
    , 'message': 'User login unsuccessful. User field is empty.'
    };
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
    }

    // Concat time of Server on login response.
    loginResponse.time = Date.now();

    _socket.emit('user-login-response', loginResponse);
    return;
  });

  return;
};

module.exports = handleLogin;
