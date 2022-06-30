const { validationResult } = require("express-validator");
let db = require("../database/models");

let restaurantsController = {
    getRestaurants: function(req, res) {
        db.Business.findAll().then((business) => {
            res.render("restaurants", { business: business });
        });
    },
    getRestaurantsDetalle: function(req, res) {
        //  db.Business.findByPk(req.params.id).then(function (restaurante) {
        //          res.render("restaurantes/restaurantes", {
        //           restaurante: restaurante,
        //          });
        // });

       db.Product.findAll().then((productos) => {
        res.render("restaurantes/restaurantes", { productos: productos });
      });
   
},
}   

module.exports = restaurantsController;