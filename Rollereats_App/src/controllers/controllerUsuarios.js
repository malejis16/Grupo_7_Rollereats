//Módulos
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const usuariosFilePath = path.join(__dirname, "../data/usuariosDataBase.json");
//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const mainController = {
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
    res.render("usuarios/register", { usuarios: usuarios });
  },
  store: function (req, res) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    console.log(req.body);
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let nuevoUsuario = {
        id_Usuario: Date.now(),
        correo_Usuario: req.body.mail,
        contraseña_Usuario: bcrypt.hashSync(req.body.contraseña, 10),
        numero_Usuario: req.body.numero,
        pais_Usuario: req.body.pais,
      };
      if (req.file) {
        if (req.file.filename) {
          nuevoUsuario.imagen_Usuario = req.file.filename;
        }
      }

      //realizar el case
      //   //agregar nuevo usuario
      usuarios.push(nuevoUsuario);
      //edtar el .json
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
      // redireccionar
      res.render("usuarios/vistaUsuarios", { usuarios: usuarios });
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

module.exports = mainController;
