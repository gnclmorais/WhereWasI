// Express specific
var express = require('express');
var router = express.Router();
// Utils
var _ = require('lodash');
var Promise = require('bluebird');
// Service specific

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

router.get('/auth', function (req, res, next) {
});

router.get('/callback', function (req, res, next) {
});

router.get('/user', function (req, res, next) {
});

router.get('/places', function (req, res, next) {
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

function getAccessToken() {
}

function getUser() {
}

function getPlaces() {
}

module.exports = router;
