//Módulos
const path = require("path");

const mainController = {
  index: function (req, res) {
    res.render("index");
  },
  login: function (req, res) {
    res.render("login");
  },
  productCart: function (req, res) {
    res.render("carro");
  },
  productDetail: function (req, res) {
    res.render("restaurante");
  },
  register: function (req, res) {
    res.render("register");
  },
};

// Acá exportamos el resultado

module.exports = mainController;
