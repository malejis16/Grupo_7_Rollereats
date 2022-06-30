var express = require('express');
var router = express.Router();

var restaurantsController = require('../controllers/controllerRestaurants');

/* GET restaurants page. */
router.get('/restaurants', restaurantsController.getRestaurants);
// router.get('/restaurants/:id',restaurantsController.getProduct, /*restaurantsController.getRestaurantsDetalle */);


module.exports = router; 
