//Módulos
/*Trabajando con la base de datos*/ /*----------------------------*/
let db = require("../database/models"); /*-----------------*/

/*generar las validaciones*/
const { validationResult } = require("express-validator");
/*Encriptacion de la contraseña*/
const bcrypt = require("bcryptjs");

const path = require("path");
const fs = require("fs");

const usuariosFilePath = path.join(__dirname, "../data/usuariosDataBase.json");
//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

/******************* */
const usersController = {
  users: function (req, res) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    res.render("usuarios/vistaUsuarios", { usuarios: usuarios });
  },
  login: function (req, res) {
    res.render("usuarios/login");
  },
  procesoLogin: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {


      db.User.findByPk(req.params.id, {}).then(function (usuarioBuscado) {
        if (usuarioBuscado.email == req.body.email) {
          if (
            bcrypt.compareSync(
              req.body.password,
              usuarioBuscado.password
            )
          )
            var usuarioALoguearse = usuarioBuscado;

          break;

        }
        console.log(usuarioALoguearse);
      if (usuarioALoguearse == undefined) {
        return res.render("usuarios/login", {
          errors: [{ msg: "El usuario o contraseña son invalidos" }],
        });
      }
      });

      
      let usuarioBuscado = usuarioALoguearse;
      req.session.usuarioLogueado = usuarioALoguearse;
      res.render("usuarios/detalleUsuario", {
        usuarioBuscado: usuarioBuscado,
      });
    } else {
      return res.render("usuarios/login", { errors: errors.errors });
    }
  },
  register: function (req, res) {
    db.User.findAll().then(function (users) {
      return res.render("usuarios/register", { users: users });
    });

    //res.render("usuarios/register", { usuarios: usuarios });
  },
  store: function (req, res) {
    //const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    console.log(req.body);
    let errors = validationResult(req);
    let user = {};
    if (errors.isEmpty()) {
      user = {
        email: req.body.mail,
        password: bcrypt.hashSync(req.body.contrasena, 10),
        phone: req.body.numero,
        country: req.body.pais,
      };
      if (req.file) {
        if (req.file.filename) {
          //nuevoUsuario.imagen_Usuario = req.file.filename;
          user.avatar = req.file.filename;
        }
      }
      db.User.create(user)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });

      //realizar el case
      //   //agregar nuevo usuario
      //usuarios.push(nuevoUsuario);
      //edtar el .json
      //fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
      // redireccionar
      res.redirect("/restaurantes");
    } else {
      return res.render("usuarios/register", { errors: errors.errors });
    }
  },
  detail: (req, res) => {
    db.User.findByPk(req.params.id, {}).then(function (usuarioBuscado) {
      res.render("usuarios/detalleUsuario", { usuarioBuscado: usuarioBuscado });
    });
  },
  edit: (req, res) => {
    let pedidoUsuario = db.User.findByPk(req.params.id);
    Promise.all(pedidoUsuario).then(function (usuarioEditable) {
      res.render("usuarios/editarUsuario", {
        usuarioEditable: usuarioEditable,
      });
    });
  },
  update: (req, res) => {
    let user = {};
    user = {
      email: req.body.mail,
      password: bcrypt.hashSync(req.body.contrasena, 10),
      phone: req.body.numero,
      country: req.body.pais,
    };
    if (req.file) {
      if (req.file.filename) {
        //nuevoUsuario.imagen_Usuario = req.file.filename;
        user.avatar = req.file.filename;
      }
    }

    db.User.update =
      (user,
      {
        where: {
          idUser: req.params.id,
        },
      });

    res.redirect("/usuarios/detalle/" + req.params.id);
  },
  destroy: (req, res) => {
    db.User.destroy({
      where: {
        idUser: req.params.id,
      },
    });
  },
};

module.exports = usersController;
