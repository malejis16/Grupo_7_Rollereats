//Módulos
const express = require("express");
var path = require("path");
const mainRouter = require("./routes/mainRouter");
const routerNosotros = require("./routes/routerNosotros");
const routerProductos = require("./routes/routerProductos");
const routerRepartidor = require("./routes/routerRepartidor");
const routerRestaurantes = require("./routes/routerRestaurantes");
const routerUsers = require("./routes/routerUsers");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE

//Express()

const app = express();

//Middelwares
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//template Engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Define la ubicación de la carpeta de las Vistas

///************************* RUTAS **********************//

//******Rutas Inicio*****//
app.use("/", mainRouter);

//**Rutas Nosotros**//
app.use("/about", routerNosotros);

//*****Rutas Productos**//
//app.use("/carro", routerProductos);

//**Rutas Repartidor**//
//app.use("/repartidor", routerRepartidor);
//app.use("/registro_Repartidor", routerRepartidor);
//app.use("/login_Repartidor", routerRepartidor);
//app.use("/creacionProducto", routerRepartidor);

//**Rutas Restaurantes**//
//app.use("/restaurante", routerRestaurantes);
//app.use("/registro_Restaurante", routerRestaurantes);
//app.use("/registro_Comercio", routerRestaurantes);

//******Rutas Users*****//
//app.use("/login", routerUsers);
//app.use("/register", routerUsers);

// **** Servidor ***** //
app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000 🤓👌");
});
