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
let restaurantes = JSON.parse(fs.readFileSync(restaurantesFilePath, "utf-8"));
let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const mainController = {
  //TODOS los productos VISTA
  restaurantes:(req, res) => {
    db.Product.findAll().then((productos) => {
      res.render("restaurantes/restaurantes", { productos: productos });
    });
  },

  //CREAR nuevo producto VISTA
  createProducto: (req, res) => {
    db.Product.findAll().then(([producto]) => {
      res.render("restaurantes/restaurante", { producto:producto });
    });
  },

  //Guardar producto CREADO
  storeProducto: (req, res) => {
    db.Product.create({
      productName: req.body.name,
      productPrice: req.body.price,
      productImg: req.body.image,
    });
    res.redirect("/restaurantes");
  },

  edit: (req, res) => {
    let id = req.params.id;
    res.render("productos/editProducto", { productos: productos, id });
  },
  // Update - Method to update
  update: (req, res) => {
    let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
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
    let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    let id = req.params.id;
    // filtrar todos los productos que no tengan ese id
    let productosFiltrados = productos.filter(
      (producto) => producto.id_Producto != id
    );

    fs.writeFileSync(
      productosFilePath,
      JSON.stringify(productosFiltrados, null, 2)
    );

    // redireccionar
    res.redirect("/restaurantes");
  },
};

module.exports = mainController;
