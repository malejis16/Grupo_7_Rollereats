//Módulos
const path = require("path");
const fs = require("fs");

const restaurantesFilePath = path.join(
  __dirname,
  "../data/restaurantesDataBase.json"
);

const productosFilePath = path.join(
  __dirname,
  "../data/productosDataBase.json"
);

//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const restaurantes = JSON.parse(fs.readFileSync(restaurantesFilePath, "utf-8"));
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const mainController = {
  restaurantes: function (req, res) {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    const restaurantes = JSON.parse(
      fs.readFileSync(restaurantesFilePath, "utf-8")
    );
    res.render("restaurantes/restaurantes", { productos: productos });
  },
  createProducto: function (req, res) {
    res.render("restaurantes/restaurante");
  },
  storeProducto: function (req, res) {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    const restaurantes = JSON.parse(
      fs.readFileSync(restaurantesFilePath, "utf-8")
    );
    //console.log(req.body);
    //console.log(req.files);
    //console.log(req.file);

    const nuevoProducto = {
      id_Producto: Date.now(),
      name_Producto: req.body.n_producto,
      price_Producto: req.body.n_precio,
      image_Producto: req.file.filename,
    };
    //agregar nuevo producto
    productos.push(nuevoProducto);
    //edtar el .json
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
    // redireccionar
    res.redirect("/restaurantes");
  } /*
  registro_Restaurante: function (req, res) {
    res.render("restaurantes/registro_Restaurante");
  },
  store_Restaurante: function (req, res) {
    const restaurantes = JSON.parse(
      fs.readFileSync(restaurantesFilePath, "utf-8")
    );
    console.log(req.body);
    const nuevoRestaurante = {
      id_Restaurante: Date.now(),
      correo_Restaurante: req.body.mail,
      contraseña_Restaurante: req.body.contraseña,
      numero_Restaurante: req.body.numero,
      pais_Restaurante: req.body.pais,
      imagen_Restaurante: req.file.filename,
    };
    //agregar nuevo usuario
    restaurantes.push(nuevoRestaurante);
    //edtar el .json
    fs.writeFileSync(
      restaurantesFilePath,
      JSON.stringify(restaurantes, null, 2)
    );
    // redireccionar
    res.render("restaurantes/login");
  },*/,
};

module.exports = mainController;
