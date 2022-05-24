//Módulos
const { validationResult } = require("express-validator");
let db = require("../database/models");

const mainController = {
  //TODOS los productos VISTA
  restaurantes: (req, res) => {
    db.Product.findAll().then((productos) => {
      res.render("restaurantes/restaurantes", { productos: productos });
    });
  },

  /*CREAR nuevo producto VISTA
  createProducto: (req, res) => {
    db.Product.findAll().then(([productos]) => {
      res.render("restaurantes/restaurantes", { productos: productos });
    });
  },*/

  //Guardar producto CREADO
  storeProducto: (req, res) => {
    let productoNuevo = {
      productName: req.body.name,
      productPrice: req.body.price,
    };
    if (req.file) {
      if (req.file.filename) {
        //nuevoUsuario.imagen_Usuario = req.file.filename;
        productoNuevo.productImg = req.file.filename;
        console.log(req.file.filename);
      }
    }
    db.Product.create(productoNuevo)
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    res.redirect("/restaurantes");
  },

  edit: (req, res) => {
    db.Product.findByPk(req.params.id).then(function (producto) {
      res.render("productos/editProducto", {
        producto: producto,
      });
    });
  },
  // Update - Method to update
  update: (req, res) => {
    if (req.file) {
      db.Product.update(
        {
          productName: req.body.name,
          productPrice: req.body.price,
          productImg: req.file.filename,
        },
        {
          where: {
            idProduct: req.params.id,
          },
        }
      )
        .then(res.redirect("/restaurantes"))
        .catch(function (errors) {
          console.log(errors);
        });
    } else {
      db.Product.update(
        {
          productName: req.body.name,
          productPrice: req.body.price,
        },
        {
          where: {
            idProduct: req.params.id,
          },
        }
      )
        .then(res.redirect("/restaurantes"))
        .catch(function (errors) {
          console.log(errors);
        });
    }
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    db.Product.destroy({
      where: {
        idProduct: req.params.id,
      },
    })
      .then(function () {
        res.redirect("/restaurantes");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = mainController;
