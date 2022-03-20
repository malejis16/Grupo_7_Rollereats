//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRestaurantes");

//Rutas Restaurantes
rutas.get("/restaurante", controller.restaurante);
rutas.use("/registro_Restaurante", controller.registro_Restaurante);
rutas.use("/registro_Comercio", controller.registro_Comercio);

module.exports = rutas;
