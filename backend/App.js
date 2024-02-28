const express = require("express");
const app = express();
const routerAbogado = require("./router/abogadoRouter");
const cors = require('cors');

// conexion backend y frontend
app.use(cors());



app.use(express.json());


app.use("/abogados", routerAbogado ); 


const conexion = require("./database/connectionbd");
conexion();

module.exports = app;