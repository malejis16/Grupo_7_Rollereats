//Módulos
const path = require("path");
const fs = require("fs");

const usuariosFilePath = path.join(__dirname, "../data/usuariosDataBase.json");
//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const mainController = {
  users: function (req, res) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    res.render("usuarios/vistaUsuarios",{
      usuarios: usuarios
    });
  },
  login: function (req, res) {
    res.render("usuarios/login");
  },
  register: function (req, res) {
    res.render("usuarios/register");
  },
  store: function (req, res) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    console.log(req.body);
    const nuevoUsuario = {
      id_Usuario: Date.now(),
      correo_Usuario: req.body.mail,
      contraseña_Usuario: req.body.contraseña,
      numero_Usuario: req.body.numero,
      pais_Usuario: req.body.pais,
      imagen_Usuario: req.file.filename,
    };
    //agregar nuevo usuario
    usuarios.push(nuevoUsuario);
    //edtar el .json
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
    // redireccionar
    res.render("usuarios/vistaUsuarios");
  },
};

module.exports = mainController;
