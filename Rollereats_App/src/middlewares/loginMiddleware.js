function loginMiddleware(req, res, next) {
  if (req.session.usuarioLogueado != undefined) {
    next();
  } else {
    res.redirect("/usuarios/login");
  }
}

module.exports = loginMiddleware;
