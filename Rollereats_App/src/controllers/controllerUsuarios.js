//Módulos
const path = require("path");
const fs = require("fs");

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
  register: function (req, res) {
    res.render("usuarios/register", { usuarios: usuarios });
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
    //   //agregar nuevo usuario
    usuarios.push(nuevoUsuario);
    //edtar el .json
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
    // redireccionar
    res.render("usuarios/vistaUsuarios");
  },
  detail: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;
    let usuarioBuscado = usuarios.find((product) => product.id == id);
    if (!usuarioBuscado) {
      res.redirect("/usuarios");
    }
    res.render("usuarios/detalleUsuario", { usuarioBuscado: usuarioBuscado });
  },
  edit: (req, res) => {
    let id = req.params.id;
    res.render("usuarios/editarUsuario", { usuarios: usuarios, id });
  },
  update: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id == id) {
        usuarios[i].correo_Usuario = req.body.mail;
        usuarios[i].numero_Usuario = req.body.contraseña;
        usuarios[i].pais_Usuario = req.body.numero;
        usuarios[i].imagen_Usuario = req.body.pais;
      }
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
    }
    res.redirect("/usuarios");
  },
  destroy: (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    let id = req.params.id;
    // filtrar todos los usuarios que no tengan ese id
    let usuariosFiltrados = usuarios.filter((producto) => producto.id != id);
    fs.writeFileSync(
      usuariosFilePath,
      JSON.stringify(usuariosFiltrados, null, 2)
    );
    redireccionar;
    res.redirect("/usuarios");
  },
};

module.exports = mainController;
