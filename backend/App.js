//app.js

const express = require("express");
const app = express();
const routerAbogado = require("./router/abogadoRouter");
const cors = require('cors');

//****************CONEXION ENTRE BACK Y FRONT CON CORS (MIDDLEWARE) */

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas de la aplicación
app.use("/abogados", routerAbogado ); 

// Conexión a la base de datos
const conexion = require("./database/connectionbd");
conexion();

module.exports = app;