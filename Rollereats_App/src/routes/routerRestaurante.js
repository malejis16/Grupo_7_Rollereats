//Módulos

const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerRestaurante");
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

rutas.get("/", logintMiddleware, controller.allRestaurantes);

module.exports = rutas;
