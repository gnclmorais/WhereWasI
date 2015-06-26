var express = require('express');
var router = express.Router();

var Promise = require('bluebird');

var configFoursquare = {
  'secrets' : {
    'clientId' :     process.env.CLIENT_ID,
    'clientSecret' : process.env.CLIENT_SECRET,
    'redirectUrl' :  process.env.REDIRECT_URL
  }
};
var foursquare = require('node-foursquare')(configFoursquare);

/**
 * Connect with 3rd party services.
 */

router.get('/:service', function (req, res, next) {
  var service = req.params.service;

  switch (service) {
    case 'foursquare':
      loginFoursquare(res);
      break;

    default:
      // TODO
  }

  function loginFoursquare (res) {
    // Signal the redirect and proceed
    res.writeHead(303, {
      'location': foursquare.getAuthClientRedirectUrl()
    });
    res.end();
  }
});

router.get('/:service/callback', function (req, res, next) {
  var service = req.params.service;

  switch (service) {
    case 'foursquare':
      // TODO
      handleFoursquareAuth(req.query.code);
      break;

    default:
      // TODO
  }

  res.send('End.');
});

/**
 * Handles the Foursquare API response.
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
function handleFoursquareAuth(code) {
  new Promise(function (resolve, reject) {
    foursquare.getAccessToken({
      code: code
    }, function (error, accessToken) {
      error ? reject(error) : resolve(accessToken);
    });
  }).then(function (token) {
    // TODO
    // - Save token somewhere, because "Access tokens do not expire (...)"
    console.log('Token:', token);

    foursquare.Checkins.getRecentCheckins({
      //limit: 250,
      limit: 5,
      sort: 'oldestfirst'
    }, token, function (error, checkins) {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Checkins:', checkins);
      }
    });

    return true;
  }).catch(function (argument) {
    // TODO
  });
}

module.exports = router;
