//Módulos
/*Trabajando con la base de datos*/ /*----------------------------*/
let db = require("../database/models"); /*-----------------*/
const path = require("path");

/******************* */
const endpointsController = {
  endpoints: function (req, res) {
    return res.render("endpoints/vistaEndpoints");
  },
};

module.exports = endpointsController;
