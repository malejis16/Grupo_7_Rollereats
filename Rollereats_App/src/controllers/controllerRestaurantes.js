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
    if (req.files) {
      let restauranteNuevo = {
        id_Producto: Date.now(),
        name_Producto: req.body.n_producto,
        price_Producto: req.body.n_precio,
        image_Producto: req.files[0].filename,
      };
      productos.push(restauranteNuevo);
      fs.writeFileSync(productosFilePath, JSON.stringify(productos));
      res.redirect("/restaurantes");
    } else {
      res.send("<h1>Error al subir la imagen</h1>");
    }
  },

  edit: (req, res) => {
    let id = req.params.id;
    res.render("productos/editProducto", { productos: productos, id });
  },
  // Update - Method to update
  update: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    let id = req.params.id;
    console.log(req.body);

    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id_Producto == id) {
        productos[i].name_Producto = req.body.n_producto;
        productos[i].price_Producto = req.body.n_precio;
        productos[i].image_Producto = req.files[0].filename;
      }
      fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
    }
    res.redirect("/restaurantes");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    let id = req.params.id;
    // filtrar todos los productos que no tengan ese id
    let productosFiltrados = productos.filter((producto) => producto.id != id);

    fs.writeFileSync(
      productosFilePath,
      JSON.stringify(productosFiltrados, null, 2)
    );

    // redireccionar
    res.redirect("/restaurantes");
  },
};

module.exports = mainController;
