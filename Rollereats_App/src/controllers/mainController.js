//Módulos
const path = require("path");

const mainController = {
  index: function (req, res) {
    res.render("index");
  },
  /* login: function (req, res) {
    res.render("users/login");
  },
  register: function (req, res) {
    res.render("users/register");
  },
  carro: function (req, res) {
    res.render("productos/carro");
  },
  creacionProducto: function (req, res) {
    res.render("productos/creacionProducto");
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
  repartidor: function (req, res) {
    res.render("repartidor/repartidor");
  },
  registro_Repartidor: function (req, res) {
    res.render("repartidor/registro_Repartidor");
  },
  login_Repartidor: function (req, res) {
    res.render("repartidor/login_Repartidor");
  },
  about: function (req, res) {
    res.render("nosotros/about");
  },*/
};

module.exports = mainController;
