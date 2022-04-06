//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerUsuarios");
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

//Rutas Users

rutas.get("/", controller.users);
rutas.get("/login", controller.login);

// //Crear
rutas.get("/register", controller.register);
rutas.post("/", upload.single("imagen"), controller.store);
<<<<<<< HEAD
// //detalle
=======

//detalle
>>>>>>> 3f0089a62bd1e0b390d4a80060ab80eab6a5dc44
rutas.get("/:id", controller.detail);

//editar
rutas.get("/editarUsuario/:id", controller.edit);
rutas.post("/:id", controller.update);

// //borrar
rutas.delete("/delete/:id", controller.destroy);

module.exports = rutas;
