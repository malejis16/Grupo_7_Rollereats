//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerNosotros");

//Rutas Nosotros
rutas.use("/about", controller.about);

module.exports = rutas;
