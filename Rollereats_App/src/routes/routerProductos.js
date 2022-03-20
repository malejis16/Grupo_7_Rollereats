//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerProductos");

//Rutas Productos
rutas.get("/carro", controller.carro);
rutas.get("/creacionProducto", controller.creacionProducto);

module.exports = rutas;
