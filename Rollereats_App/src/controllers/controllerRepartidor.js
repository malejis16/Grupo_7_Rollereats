//Módulos
const path = require("path");

const mainController = {
  repartidor: function (req, res) {
    res.render("repartidor/repartidor");
  },
  registro_Repartidor: function (req, res) {
    res.render("repartidor/registro_Repartidor");
  },
  login_Repartidor: function (req, res) {
    res.render("repartidor/login_Repartidor");
  },
};

module.exports = mainController;
