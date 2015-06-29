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

/**
 * ________
 * `MMMMMMMb.
 *  MM    `Mb                        /
 *  MM     MM    _____   ___   ___  /M       ____     ____
 *  MM     MM   6MMMMMb  `MM    MM /MMMMM   6MMMMb   6MMMMb\
 *  MM    .M9  6M'   `Mb  MM    MM  MM     6M'  `Mb MM'    `
 *  MMMMMMM9'  MM     MM  MM    MM  MM     MM    MM YM.
 *  MM  \M\    MM     MM  MM    MM  MM     MMMMMMMM  YMMMMb
 *  MM   \M\   MM     MM  MM    MM  MM     MM            `Mb
 *  MM    \M\  YM.   ,M9  YM.   MM  YM.  , YM    d9 L    ,MM
 * _MM_    \M\_ YMMMMM9    YMMM9MM_  YMMM9  YMMMM9  MYMMMM9
 */

router.get('/', function (req, res, next) {
  // TODO
  // Do something with the root address?
});

router.get('/auth', function (req, res, next) {
  res.writeHead(303, {
    'location': foursquare.getAuthClientRedirectUrl()
  });
  res.end();
});

router.get('/callback', function (req, res, next) {
  getAccessToken(req.query.code)
    .then(storeAccessToken)
    .then(function () {
      res.redirect('/places');
    })
    .catch(console.error); // TODO
});

router.get('/user', function (req, res, next) {
  // TODO
  getUser(configFoursquare.accessToken)
    .then(function (user) {
      res.json(user);
    })
});

router.get('/cities', function (req, res, next) {
  getPlaces(configFoursquare.accessToken)
    .then(placesToCities)
    .then(function (places) {
      res.json(places);
    });
});

router.get('/places', function (req, res, next) {
  getPlaces(configFoursquare.accessToken)
    .then(placesToPlaces)
    .then(function (places) {
      res.json(places);
    });
});


/**
 *  ________
 *  `MMMMMMMb.         68b
 *   MM    `Mb         Y89                         /
 *   MM     MM ___  __ ___ ____    ___    ___     /M       ____
 *   MM     MM `MM 6MM `MM `MM(    )M'  6MMMMb   /MMMMM   6MMMMb
 *   MM    .M9  MM69 "  MM  `Mb    d'  8M'  `Mb   MM     6M'  `Mb
 *   MMMMMMM9'  MM'     MM   YM.  ,P       ,oMM   MM     MM    MM
 *   MM         MM      MM    MM  M    ,6MM9'MM   MM     MMMMMMMM
 *   MM         MM      MM    `Mbd'    MM'   MM   MM     MM
 *   MM         MM      MM     YMP     MM.  ,MM   YM.  , YM    d9
 *  _MM_       _MM_    _MM_     M      `YMMM9'Yb.  YMMM9  YMMMM9
*/

function getAccessToken(code) {
  return new Promise(function (resolve, reject) {
    foursquare.getAccessToken({
      code: code
    }, function (error, accessToken) {
      if (error) {
        reject(error);
        return;
      }

      resolve(accessToken);
    });
  });
}

function storeAccessToken(accessToken) {
  return new Promise(function (resolve, reject) {
    // TODO
    // Temporary store
    configFoursquare.accessToken = accessToken;

    resolve(accessToken);
  });
}

function getUser(accessToken) {
  return new Promise(function (resolve, reject) {
    foursquare.Users.getUser('self', accessToken, function (error, user) {
      error ? reject(error) : resolve(user);
    });
  });
}

function getPlaces(accessToken) {
  return new Promise(function (resolve, reject) {
    foursquare.Users.getCheckins('self', {
      limit: 250,
      //limit: 5,
      //sort: 'oldestfirst'
    }, accessToken, function (error, checkins) {
      error ? reject(error) : resolve(checkins);
    });
  });
}

/**
 * Crunches checkins into an object of city + country as keys and the number
 * of checkins as value.
 * @param  {[type]} places [description]
 * @return {[type]}        [description]
 */
function placesToCities(places) {
  places = _.get(places, 'checkins.items') || places;

  return new Promise(function (resolve, reject) {
    resolve(places.reduce(function (cities, checkin) {
      var city = _.get(checkin, 'venue.location.city');
      var country = _.get(checkin, 'venue.location.country');

      if (city && country) {
        var place = city + ', ' + country;
        var count = cities[place] || 0;
        cities[place] = count + 1;
      }

      return cities;
    }, {}));
  });
}

function placesToPlaces(venues) {
  venues = _.get(venues, 'checkins.items') || venues;

  return new Promise(function (resolve, reject) {
    resolve(venues.reduce(function (places, checkin) {
      var name = _.get(checkin, 'venue.name');
      var location = _.get(checkin, 'venue.location');

      location = places[name] || location;
      location.name = name;
      location.checkins = (location.checkins || 0) + 1;
      places[name] = location;

      return places;
    }, {}));
  });
}

module.exports = router;
