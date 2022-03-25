//Módulos
const path = require("path");
const fs = require("fs");

const restaurantesFilePath = path.join(
  __dirname,
  "../data/restaurantesDataBase.json"
);
const comercioFilePath = path.join(__dirname, "../data/comercioDataBase.json");

//pasamos esta constante al index para que se recargue cada vez que refrescamos las pag
const restaurantes = JSON.parse(fs.readFileSync(restaurantesFilePath, "utf-8"));
const comercio = JSON.parse(fs.readFileSync(comercioFilePath, "utf-8"));

const mainController = {
  restaurantes: function (req, res) {
    res.render("restaurantes/restaurantes");
  },
  restaurante: function (req, res) {
    res.render("restaurantes/restaurante");
  },
  registro_Restaurante: function (req, res) {
    res.render("restaurantes/registro_Restaurante");
  },
  registro_Comercio: function (req, res) {
    res.render("restaurantes/registro_Comercio");
  },

  store_Restaurante: function (req, res) {
    const restaurantes = JSON.parse(
      fs.readFileSync(restaurantesFilePath, "utf-8")
    );
    console.log(req.body);
    const nuevoRestaurante = {
      id_Restaurante: Date.now(),
      correo_Restaurante: req.body.mail,
      contraseña_Restaurante: req.body.contraseña,
      numero_Restaurante: req.body.numero,
      pais_Restaurante: req.body.pais,
      imagen_Restaurante: req.file.filename,
    };
    //agregar nuevo usuario
    restaurantes.push(nuevoRestaurante);
    //edtar el .json
    fs.writeFileSync(
      restaurantesFilePath,
      JSON.stringify(restaurantes, null, 2)
    );
    // redireccionar
    res.render("restaurantes/login");
  },
  store_Comercio: function (req, res) {
    const comercio = JSON.parse(fs.readFileSync(comercioFilePath, "utf-8"));
    console.log(req.body);
    const nuevoComercio = {
      id_Comercio: Date.now(),
      correo_Comercio: req.body.mail,
      contraseña_Comercio: req.body.contraseña,
      numero_Comercio: req.body.numero,
      pais_Comercio: req.body.pais,
      imagen_Comercio: req.file.filename,
    };
    //agregar nuevo usuario
    comercio.push(nuevoComercio);
    //edtar el .json
    fs.writeFileSync(comercioFilePath, JSON.stringify(comercio, null, 2));
    // redireccionar
    res.render("comercio/login");
  },
};

module.exports = mainController;
