//Módulos
const path = require("path");

const mainController = {
  login: function (req, res) {
    res.render("users/login");
  },
  register: function (req, res) {
    res.render("users/register");
  },
};

module.exports = mainController;
