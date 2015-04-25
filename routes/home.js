var router = require('express').Router();

router.get('/', function(_req, _res) {
  _res.send('Hompage GET!');
  return;
});

module.exports = router;
