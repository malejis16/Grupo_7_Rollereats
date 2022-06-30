var express = require('express');
var router = express.Router();

var restaurantsController = require('../controllers/restaurantsController');

/* GET restaurants page. */
router.get('/restaurants', restaurantsController.getRestaurants);

module.exports = router; 
