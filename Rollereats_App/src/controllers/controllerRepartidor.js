//Módulos
const path = require("path");
const fs = require("fs");

const repartidoresFilePath = path.join(
  __dirname,
  "../data/repartidoresDataBase.json"
);
//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const repartidores = JSON.parse(fs.readFileSync(repartidoresFilePath, "utf-8"));

const mainController = {
  login_Repartidor: function (req, res) {
    res.render("repartidor/login_Repartidor");
  },
  registro_Repartidor: function (req, res) {
    res.render("repartidor/registro_Repartidor");
  },
  store: function (req, res) {
    const repartidores = JSON.parse(
      fs.readFileSync(repartidoresFilePath, "utf-8")
    );
    console.log(req.body);
    const nuevoRepartidor = {
      id_Repartidor: Date.now(),
      correo_Repartidor: req.body.mail,
      contraseña_Repartidor: req.body.contraseña,
      numero_Repartidor: req.body.numero,
      pais_Repartidor: req.body.pais,
      imagen_Repartidor: req.file.filename,
    };
    //agregar nuevo usuario
    repartidores.push(nuevoRepartidor);
    //edtar el .json
    fs.writeFileSync(
      repartidoresFilePath,
      JSON.stringify(repartidores, null, 2)
    );
    // redireccionar
    res.render("repartidor/login_Repartidor");
  },
};

module.exports = mainController;
