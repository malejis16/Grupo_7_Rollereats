//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/mainController");

rutas.get("/", controller.index);
rutas.get("/login", controller.login);
rutas.get("/carro", controller.productCart);
rutas.get("/restaurante", controller.productDetail);
rutas.get("/register", controller.register);

module.exports = rutas;
