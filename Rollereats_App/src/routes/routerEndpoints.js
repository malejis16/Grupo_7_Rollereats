//Módulos//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerEndpoints");

//Rutas Users

rutas.get("/", controller.endpoints);

//rutas.post("/login", controller.login);

module.exports = rutas;
