var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  app.render('places', {
    name: 'Tobi'
  });
});

module.exports = router;
