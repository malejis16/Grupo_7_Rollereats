//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerNosotros");

//Rutas Nosotros
rutas.get("/", controller.about);

module.exports = rutas;
