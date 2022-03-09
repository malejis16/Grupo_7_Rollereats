//Módulos
const express = require("express");
const app = express();
var path = require("path");
const rutas = require("./routes/mainRouter");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Rutas Inicio
app.use("/", rutas);

//Rutas Users
app.use("/login", rutas);
app.use("/register", rutas);

//Rutas Productos
app.use("/carro", rutas);

//Rutas Restaurantes
app.use("/restaurante", rutas);
app.use("/registro_Restaurante", rutas);
app.use("/registro_Comercio", rutas);

//Rutas Repartidor
app.use("/repartidor", rutas);
app.use("/registro_Repartidor", rutas);
app.use("/login_Repartidor", rutas);
app.use("/creacionProducto", rutas);

//Rutas Nosotros
app.use("/about", rutas);

app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000 🤓👌");
});
