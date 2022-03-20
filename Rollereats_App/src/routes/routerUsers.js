//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerUsers");

//Rutas Users
rutas.get("/login", controller.login);
rutas.get("/register", controller.register);

module.exports = rutas;
