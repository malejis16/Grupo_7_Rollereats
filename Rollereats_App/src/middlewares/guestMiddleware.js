function guestMiddleware(req, res, next) {
  if (req.session.usuarioLogueado == undefined) {
    next();
  } else {
    res.redirect("/restaurantes");
  }
}

module.exports = guestMiddleware;
