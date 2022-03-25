//Módulos
const express = require("express");
var path = require("path");
const mainRouter = require("./routes/mainRouter");
const routerNosotros = require("./routes/routerNosotros");
const routerProductos = require("./routes/routerProductos");
const routerRepartidor = require("./routes/routerRepartidor");
const routerRestaurantes = require("./routes/routerRestaurantes");
const routerUsuarios = require("./routes/routerUsuarios");
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE

//Express()

const app = express();

//Middelwares
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//template Engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Define la ubicación de la carpeta de las Vistas

///************************* RUTAS **********************//

//******Rutas Inicio*****//
app.use("/", mainRouter);

//**Rutas Nosotros**//
app.use("/about", routerNosotros);

//*****Rutas Productos**//
app.use("/productos", routerProductos);

//**Rutas Repartidor**//
app.use("/repartidor", routerRepartidor);

//**Rutas Restaurantes**//
app.use("/restaurantes", routerRestaurantes);
app.use("/registro_Restaurante", routerRestaurantes)
app.use("/registro_Comercio", routerRestaurantes)

//******Rutas Users*****//
app.use("/usuarios", routerUsuarios);

// **** Servidor ***** //
app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000 🤓👌");
});
