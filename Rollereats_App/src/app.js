//Módulos
const express = require("express");
var path = require("path");
const mainRouter = require("./routes/mainRouter");
const cors = require("cors");
const routerNosotros = require("./routes/routerNosotros");
const routerProductos = require("./routes/routerProductos");
const routerRepartidor = require("./routes/routerRepartidor");
const routerRestaurantes = require("./routes/routerRestaurantes");
const routerUsuarios = require("./routes/routerUsuarios");
const routerEndpoints = require("./routes/routerEndpoints");

const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const dbDigitalHouse = require("./database/models"); /***************/
const PORT = process.env.PORT || 3000; /************************** */


//cors


//Express()
const app = express();

//Middelwares
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "informacion secreta" }));
app.use(cors());

//template Engine - Motor de plantilla

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
//******Rutas Users*****//
app.use("/usuarios", routerUsuarios);
//******Rutas Endpoints*****//
app.use("/endpoints", routerEndpoints);

// **** Servidor ***** //
// app.listen(3000, () => {
//   console.log("Servidor arriba en el puerto 3000 🤓👌");
// });

dbDigitalHouse.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listen on: http://localhost:${PORT}`);
  });
});


