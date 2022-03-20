//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRepartidor");

//Rutas Repartidor
rutas.use("/repartidor", controller.repartidor);
rutas.use("/registro_Repartidor", controller.registro_Repartidor);
rutas.use("/login_Repartidor", controller.login_Repartidor);

module.exports = rutas;
