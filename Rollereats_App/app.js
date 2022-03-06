//Módulos
const express = require("express");
const app = express();
var path = require("path");
const rutas = require("./routes/mainRouter");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", rutas);
app.use("/login", rutas);
app.use("/productCart", rutas);
app.use("/productDetail", rutas);
app.use("/register", rutas);

app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000 🤓👌");
});
