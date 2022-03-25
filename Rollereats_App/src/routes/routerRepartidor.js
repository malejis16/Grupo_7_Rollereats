//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRepartidor");
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

//Rutas Repartidor
rutas.get("/login", controller.login_Repartidor);
rutas.get("/register", controller.registro_Repartidor);
rutas.post("/", upload.single("imagen"), controller.store);

module.exports = rutas;
