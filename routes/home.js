var router = require('express').Router();

router.get('/', function(_req, _res) {
  _res.render('home');
  return;
});

module.exports = router;
