var express = require('express');
var router = express.Router();

var _ = require('lodash');
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
      fsGetAccessToken(req.query.code)
        .then(fsGetUser)
        .then(function (user) {
          res.status(200).json(user);
        })
        .catch(console.error);
        // .then(function (checkins) {
        //   var result = checkins.recent || checkins;

        //   // Extract just the cities
        //   result = result.reduce(function (acc, checkin) {
        //     var city = _.get(checkin, 'venue.location.city');
        //     var country = _.get(checkin, 'venue.location.country');

        //     city && country && acc.push(city + ', ' + country);

        //     return acc;
        //   }, []);

        //   res.send(result);
        // });
      break;

    default:
      // TODO
  }
});

/**
 * Handles the Foursquare API response.
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
function fsGetAccessToken(code) {
  return new Promise(function (resolve, reject) {
    foursquare.getAccessToken({
      code: code
    }, function (error, accessToken) {
      if (error) {
        reject(error);
        return;
      }

      // TODO
      // Temporary store
      configFoursquare.accessToken = accessToken;
      resolve(accessToken);
    });
  });

  //return fsAuth(code).catch(console.error);
  //return fsAuth(code).then(fsGetCheckins).catch(console.error);
}



function fsGetUser(token) {
  return new Promise(function (resolve, reject) {
    foursquare.Users.getUser('self', token, function (error, user) {
      error ? reject(error) : resolve(user);
    });
  });
}

function fsGetCheckins(token) {
  return new Promise(function (resolve, reject) {
    foursquare.Users.getCheckins('self', {
      //limit: 250,
      limit: 5,
      sort: 'oldestfirst'
    }, token, function (error, checkins) {
      error ? reject(error) : resolve(checkins);
    });
  });
}

module.exports = router;
