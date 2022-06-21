//Módulos//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerUsuarios");
const multer = require("multer");
const path = require("path");
const { check } = require("express-validator");
let guestMiddleware = require("../middlewares/guestMiddleware");
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

//Rutas Users

rutas.get("/", controller.users);
rutas.get("/listas", controller.list);
rutas.get("/listas/:id", controller.show);
rutas.post("/", controller.store2);

// //Crear
rutas.get("/register", guestMiddleware, controller.register);
rutas.post(
  "/register",
  upload.single("avatar"),
  [
    check("email").isEmail().withMessage("No es un correo permitido").bail(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres")
      .bail(),
  ],
  controller.store
);

//detalle
rutas.get("/detalle/:id", controller.detail);

//editar
rutas.get("/editarUsuario/:id", controller.edit);
rutas.put("/editarUsuario/:id", upload.single("avatar"), controller.update);
//delete
rutas.delete("/delete/:id", controller.destroy);

//login
rutas.get("/login", controller.login);
rutas.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("No es un email permitido")
      .bail()
      .notEmpty()
      .withMessage("Ingresa tu email")
      .bail(),
    check("password").notEmpty().withMessage("Ingresa tu contraseña").bail(),
  ],
  controller.procesoLogin
);

// check de logeo

rutas.get("/check", function (req, res) {
  if (req.session.usuarioLogueado == undefined) {
    res.send("No estas logueado");
  } else {
    res.send(req.session.usuarioLogueado.correo_Usuario);
  }
});

//rutas.post("/login", controller.login);

module.exports = rutas;
