//Módulos
const path = require("path");

const mainController = {
  about: function (req, res) {
    res.render("nosotros/about");
  },
};

module.exports = mainController;
