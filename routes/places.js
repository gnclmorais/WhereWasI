var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('places', {
    name: 'Tobi'
  });
});

module.exports = router;
