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
    db.User.findAll().then(function (usuarios) {
      return res.render("usuarios/vistaUsuarios", { usuarios: usuarios });
    });
  },
  login: function (req, res) {
    res.render("usuarios/login");
  },
  procesoLogin: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({ where: { email: req.body.email } }).then(function (
        userBuscado
      ) {
        console.log("userBuscado");
        console.log(userBuscado);
        if (userBuscado != null) {
          if (bcrypt.compareSync(req.body.password, userBuscado.password)) {
            var usuarioALoguearse = userBuscado;
            console.log("Usuario a loguarse");
            console.log(usuarioALoguearse);
          }
        }

        if (usuarioALoguearse == undefined) {
          console.log("no debe pasar por aqui con credenciales correctas");
          return res.render("usuarios/login", {
            errors: [{ msg: "El usuario o contraseña son invalidos" }],
          });
        }

        let usuarioBuscado = usuarioALoguearse; 
        req.session.usuarioLogueado = usuarioALoguearse;
        res.render("usuarios/detalleUsuario", {
          usuarioBuscado: usuarioBuscado,
        });
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
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        country: req.body.country,
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
    db.User.findByPk(req.params.id).then(function (usuarioBuscado) {
      res.render("usuarios/detalleUsuario", { usuarioBuscado: usuarioBuscado });
      let usuarioG
    });
  

  },
  edit: (req, res) => {
    db.User.findByPk(req.params.id).then(function (usuarioEditable) {
      res.render("usuarios/editarUsuario", {
        usuarioEditable: usuarioEditable,
      });
    });
  },
  update: (req, res) => {
    if (req.file) {
      var filename = req.file.filename;

      db.User.update(
        {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          phone: req.body.phone,
          country: req.body.country,
          avatar: filename,
        },
        {
          where: {
            idUser: req.params.id,
          },
        }
      )
        .then(res.redirect("/usuarios/detalle/" + req.params.id))
        .catch(function (errors) {
          console.log(errors);
        });
    } else {
      db.User.update(
        {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          phone: req.body.phone,
          country: req.body.country,
        },
        {
          where: {
            idUser: req.params.id,
          },
        }
      )
        .then(res.redirect("/usuarios/detalle/" + req.params.id))
        .catch(function (errors) {
          console.log(errors);
        });
    }
  },

  destroy: (req, res) => {
    db.User.destroy({
      where: {
        idUser: req.params.id,
      },
    })
      .then(function () {
        res.redirect("/usuarios");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  list: (req, res) => {
    db.User.findAll()
      .then((Users) => {
        return res.status(200).json({
          total: Users.length,
          data: Users,
          lastUser: Users[Users.length - 1],
          status: 200,
        });
      })
      .catch((error) => res.json(error));
  },
  show: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((User) => {
        return res.status(200).json({
          idUser: User.idUser,
          email: User.email,
          idUser: User.idUser,
          phone: User.phone,
          country: User.country,
          avatar: "http://localhost:3001/img/" + User.avatar,
          status: 200,
        });
      })
      .catch((error) => res.json(error));
  },
};

module.exports = usersController;
