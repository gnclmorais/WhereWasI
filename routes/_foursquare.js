// Express specific
var express = require('express');
var router = express.Router();
// Utils
var _ = require('lodash');
var Promise = require('bluebird');
// Service specific
var configFoursquare = {
  'secrets' : {
    'clientId' :     process.env.CLIENT_ID,
    'clientSecret' : process.env.CLIENT_SECRET,
    'redirectUrl' :  process.env.REDIRECT_URL
  }
};
var foursquare = require('node-foursquare')(configFoursquare);

router.get('/login', function (req, res, next) {
});

router.get('/callback', function (req, res, next) {
});

router.get('/user', function (req, res, next) {
});

router.get('/places', function (req, res, next) {
});

module.exports = router;
