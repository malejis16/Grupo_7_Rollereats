//Módulos
const express = require("express");
const rutas = express.Router();
const controller = require("../controllers/controllerProductos");
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

//vista
rutas.get("/", controller.allProducts);

//Crear Producto
rutas.get("/createProduct", controller.createProduct);
//Guardar producto creado
rutas.post("/createProduct", upload.any(), controller.saveProduct);

//Editar Producto
rutas.get("/edit/:id", controller.editProduct);
//Guardar producto editado
rutas.put("/edit/:id", upload.any(), controller.updateProduct);

//Eliminar producto
rutas.delete("/delete/:id", controller.deleteProduct);

module.exports = rutas;
 