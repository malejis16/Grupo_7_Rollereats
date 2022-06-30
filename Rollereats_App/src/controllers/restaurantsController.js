const { validationResult } = require("express-validator");
let db = require("../database/models");

let restaurantsController = {
    getRestaurants: function(req, res) {
        db.Business.findAll().then((business) => {
            res.render("restaurants", { business: business });
        });
    },
    putRestaurants: function(req, res) {

    },
    deleteRestaurants: function(req, res) {

    }
}
module.exports = restaurantsController;