function loginMiddleware(req, res, next) {
  if (req.session.usuarioLogueado != undefined) {
    next();
  } else {
    res.redirect("/usuarios/register");
  }
}

module.exports = loginMiddleware;
