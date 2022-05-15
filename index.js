const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
//agregar cors
const cors = require("cors");

//crear el server express
const app = express();

//configurar cors
app.use(cors());

//lectura y parseo de body
app.use( express.json());

//Bd
dbConnection();

//Rutasd
app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/login', require('./routes/auth'));

app.use('/api/productos', require('./routes/productos'));



app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto:  " + process.env.PORT);
});
