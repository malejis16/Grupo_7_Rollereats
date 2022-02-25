const express = require("express");

const app = express();

app.use(express.static("public"));

app.listen(3001, () => {
  console.log("Server Runing");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/Ingresar", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
app.get("/Registro", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});
app.get("/Carrito", (req, res) => {
  res.sendFile(__dirname + "/views/productCart.html");
});
app.get("/productoDetalle", (req, res) => {
  res.sendFile(__dirname + "/views/productDetail.html");
});

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
