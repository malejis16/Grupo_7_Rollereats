//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRestaurantes");
const path = require("path");
const multer = require("multer");
let logintMiddleware = require("../middlewares/loginMiddleware");

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
rutas.get("/", logintMiddleware, controller.restaurantes);

//Crear Producto
//rutas.get("/createProducto", controller.createProducto);
rutas.post(
  "/createProducto",
  upload.single("productImg"),
  controller.storeProducto
);
rutas.get("/listas", controller.list);
rutas.get("/listas/:id", controller.show);
//Editar Producto
rutas.get("/edit/:id", controller.edit);
rutas.put("/edit/:id", upload.single("productImg"), controller.update);

//Eliminar
rutas.delete("/eliminar/:id", controller.destroy);

module.exports = rutas;
