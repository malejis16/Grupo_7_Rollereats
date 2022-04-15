//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRestaurantes");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img"));
  },
  filename: function (req, file, cb) {
    const newFileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

var upload = multer({ storage });

//Rutas Restaurantes
rutas.get("/", controller.restaurantes);
//Crear Producto
rutas.get("/createProducto", controller.createProducto);
rutas.post("/createProducto", upload.any(), controller.storeProducto);
//Editar Producto
rutas.get("/edit/:id", controller.edit);
rutas.put("/edit/:id", upload.any(), controller.update);

//Eliminar
rutas.delete("eliminar/:id", controller.destroy);

module.exports = rutas;
