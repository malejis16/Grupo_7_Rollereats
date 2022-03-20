//Módulos
const path = require("path");

const mainController = {
  restaurantes: function (req, res) {
    res.render("restaurantes/restaurantes");
  },
  restaurante: function (req, res) {
    res.render("restaurantes/restaurante");
  },
  registro_Restaurante: function (req, res) {
    res.render("restaurantes/registro_Restaurante");
  },
  registro_Comercio: function (req, res) {
    res.render("restaurantes/registro_Comercio");
  },
};

module.exports = mainController;
