const express = require("express");
const app = express();
var path = require("path");
const rutas = require("./routes/mainRouter");

app.use(express.static("public"));
app.set("engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(process.env.PORT || 3001, () => {
  console.log("Server Runing");
});

//Configuración
app.use("/", rutas);
app.use("/Ingresar", rutas);
app.use("/Registro", rutas);
app.use("/Carrito", rutas);
app.use("/productoDetalle", rutas);
