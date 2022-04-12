//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerUsuarios");
const multer = require("multer");
const path = require("path");

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

//Rutas Users

rutas.get("/", controller.users);
rutas.get("/login", controller.login);

// //Crear
rutas.get("/register", controller.register);
rutas.post("/", upload.single("imagen"), controller.store);

//detalle
rutas.get("/:id", controller.detail);

//editar
rutas.get("/editarUsuario/:id", controller.edit);
rutas.put("/:id", controller.update);

// //borrar
rutas.delete("/delete/:id", controller.destroy);

module.exports = rutas;
