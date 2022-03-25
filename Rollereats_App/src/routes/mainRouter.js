//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/mainController");

//Rutas Inicio
rutas.get("/", controller.index);

//Rutas Users
//rutas.get("/login", controller.login);
//rutas.get("/register", controller.register);

//Rutas Productos
//rutas.get("/carro", controller.carro);
//rutas.get("/creacionProducto", controller.creacionProducto);

//Rutas Restaurantes
//rutas.get("/restaurante", controller.restaurante);
//rutas.use("/registro_Restaurante", controller.registro_Restaurante);
//rutas.use("/registro_Comercio", controller.registro_Comercio);

//Rutas Repartidor
//rutas.use("/repartidor", controller.repartidor);
//rutas.use("/registro_Repartidor", controller.registro_Repartidor);
//rutas.use("/login_Repartidor", controller.login_Repartidor);

//Rutas Nosotros
//rutas.use("/about", controller.about);

module.exports = rutas;
