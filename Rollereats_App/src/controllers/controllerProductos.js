const { validationResult } = require("express-validator");
let db = require("../database/models");

const productController = {
  //TODOS los productos VISTA
  allProducts: (req, res) => {
    db.Product.findAll().then((products) => {
      console.log(products);
      res.render("restaurante/business", { products: products });
    });
  },
  //VISTA para EDITAR producto
  editProduct: (req, res) => {
    db.Product.findByPk(req.params.id).then((product) => {
      res.render("productos/editProducto", { product: product });
    });
  },

  //ACTUALIZAR  producto
  updateProduct: (req, res) => {
    db.Product.update(
      {
        productName: req.body.name,
        productPrice: req.body.price,
        productDescription: req.body.description,
        productImg: req.body.image,
        idCategory: req.body.category,
      },
      {
        where: {
          idProduct: req.params.id,
        },
      }
    );
    res.redirect("/business");
  },

  //CREAR nuevo producto VISTA
  createProduct: (req, res) => {
    db.Product.findAll().then(([product]) => {
      res.render("restaurante/business", { product: product });
    });
  },

  //Guardar producto CREADO
  saveProduct: (req, res) => {
    db.Product.create({
      productName: req.body.name,
      productPrice: req.body.price,
      productDescription: req.body.description,
      productImg: req.body.image,
      idCategory: req.body.category,
    });
    console.log(db.Product);
    res.redirect("/business");
  },

  //Eliminar Producto
  deleteProduct: (req, res) => {
    db.Product.destroy({
      where: {
        idProduct: req.params.id,
      },
    }).then(() => {
      res.redirect("/business");
    });
  },
};

module.exports = productController;
