//Módulos
const path = require("path");

const mainController = {
  index: function (req, res) {
    res.render("productos/carro");
  },
  creacionProducto: function (req, res) {
    res.render("productos/creacionProducto");
  },
};

module.exports = mainController;
