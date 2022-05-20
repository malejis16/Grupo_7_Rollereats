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
      const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
      for (i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo_Usuario == req.body.email) {
          if (
            bcrypt.compareSync(
              req.body.password,
              usuarios[i].contraseña_Usuario
            )
          )
            var usuarioALoguearse = usuarios[i];
          break;
        }
      }
      console.log(usuarioALoguearse);
      if (usuarioALoguearse == undefined) {
        return res.render("usuarios/login", {
          errors: [{ msg: "El usuario o contraseña son invalidos" }],
        });
      }
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
        email : req.body.mail,
        password : bcrypt.hashSync(req.body.contrasena, 10),
        phone : req.body.numero,
        country: req.body.pais,
      }
      if (req.file) {
        if (req.file.filename) {
          //nuevoUsuario.imagen_Usuario = req.file.filename;
          user.avatar = req.file.filename
        }
      }
      db.User.create(user)
        .then(function(data){
            console.log(data);
        })
        .catch(function(error){
          console.log(error);
      })

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
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;

    let usuarioBuscado = usuarios.find((usuario) => usuario.id_Usuario == id);

    if (!usuarioBuscado) {
      res.redirect("/usuarios");
    }
    res.render("usuarios/detalleUsuario", { usuarioBuscado: usuarioBuscado });
  },
  edit: (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id_Usuario == id) {
        usuarioEditable = usuarios[i];
      }
    }
    res.render("usuarios/editarUsuario", {
      usuarios: usuarios,
      id,
      usuarioEditable: usuarioEditable,
    });
  },
  update: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;
    console.log(req.file);
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id_Usuario == id) {
        usuarios[i].correo_Usuario = req.body.mail;
        usuarios[i].numero_Usuario = req.body.numero;
        usuarios[i].pais_Usuario = req.body.pais;
      }
      if (req.file) {
        if (req.file.filename) {
          usuarios[i].imagen_Usuario = req.file.filename;
        }
      }

      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
    }
    res.redirect("/usuarios");
  },
  destroy: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;
    // filtrar todos los usuarios que no tengan ese id

    let usuariosFiltrados = usuarios.filter(
      (usuario) => usuario.id_Usuario != id
    );

    fs.writeFileSync(
      usuariosFilePath,
      JSON.stringify(usuariosFiltrados, null, 2)
    );

    res.redirect("/usuarios");
  },
};

module.exports = usersController;
