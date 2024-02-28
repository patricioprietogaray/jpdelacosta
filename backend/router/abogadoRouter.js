const express = require("express");
const routesAbogados = express.Router();
const abogadosController = require("../controller/abogadosControllerCRUD");
const { bdAbogCUIT, bdAbogNombre, bdAbogTomo, bdAbogFolio, bdAbogDomicilioReal, bdAbogTelefono, bdAbogCelular, bdAbogCorreoElectrónico, bdAbogDomicilioElectronico, bdAbogAsesor, bdAbogDefensor, bdAbogDomicilioLegal, bdAbogHorarioAtencion, bdAbogZona } = require("../utils/validations-atributos");
const middlewareCuitNumero = require("../middleware/convertirCuitaNumero");

const { validacionesGenerales, body } = require("../middleware/validacionesGenerales");

//const 

// cRud Read
routesAbogados.get("/", abogadosController.todosLosAbogados);

//routesAbogados.get("/:cuit", middlewareCuitNumero, abogadosController.todosLosAbogados);

// Crud Create
routesAbogados.post(
    "/",
    //validar
    bdAbogCUIT, bdAbogNombre, bdAbogTomo, bdAbogFolio,
    bdAbogDomicilioReal, bdAbogTelefono, bdAbogCelular,
    bdAbogCorreoElectrónico, bdAbogDomicilioElectronico, bdAbogAsesor,
    bdAbogDefensor, bdAbogDomicilioLegal, bdAbogHorarioAtencion, bdAbogZona,
    validacionesGenerales,
    // llamo a la funcion crear
    abogadosController.crearRegistroAbog);

routesAbogados.put("/:cuit", middlewareCuitNumero, abogadosController.actualizarRegistroAbog);

routesAbogados.delete("/:cuitParaBorrar", middlewareCuitNumero, abogadosController.borrarRegistroAbog);


// buscar por cuit
routesAbogados.get("/:cuit", middlewareCuitNumero, abogadosController.unAbogadoPorCuit);

module.exports = routesAbogados;