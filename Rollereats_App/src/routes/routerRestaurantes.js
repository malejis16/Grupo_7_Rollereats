//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRestaurantes");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

//Rutas Restaurantes
rutas.get("/", controller.restaurantes);
rutas.get("/registro_Restaurante", controller.registro_Restaurante);
rutas.post("/", upload.single("imagen"), controller.store_Restaurante);
rutas.get("/registro_Comercio", controller.registro_Comercio);
rutas.post("/", upload.single("imagen"), controller.store_Comercio);

module.exports = rutas;
