const express = require("express");
const routesAbogados = express.Router();
const abogadosController = require("../controller/abogadosControllerCRUD");
const { bdAbogCUIT, bdAbogNombre, bdAbogTomo, bdAbogFolio, bdAbogDomicilioReal, bdAbogTelefono, bdAbogCelular, bdAbogCorreoElectrónico, bdAbogDomicilioElectronico, bdAbogAsesor, bdAbogDefensor, bdAbogDomicilioLegal, bdAbogHorarioAtencion, bdAbogZona, bdAbogUsuarioMev } = require("../utils/validations-atributos");
const middlewareCuitNumero = require("../middleware/convertirCuitaNumero");

const { validacionesGenerales, body } = require("../middleware/validacionesGenerales");

//const 

// cRud Read
// muestra todos los abogados
routesAbogados.get("/todos/", abogadosController.todosLosAbogados);

// buscar por cuit
routesAbogados.get("/cuit/:cuit", middlewareCuitNumero, abogadosController.unAbogadoPorCuit);

// buscar por nombre
routesAbogados.get("/nombre/:nombre", abogadosController.abogadosPorNombre);

// buscar por zona
routesAbogados.get("/zona/:zona", abogadosController.abogadosPorZona);

//routesAbogados.get("/:cuit", middlewareCuitNumero, abogadosController.todosLosAbogados);

// Crud Create
routesAbogados.post(
    "/crear",
    //validar
    bdAbogCUIT, bdAbogNombre, bdAbogTomo, bdAbogFolio,
    bdAbogDomicilioReal, bdAbogTelefono, bdAbogCelular,
    bdAbogCorreoElectrónico, bdAbogDomicilioElectronico, bdAbogAsesor,
    bdAbogDefensor, bdAbogDomicilioLegal, bdAbogHorarioAtencion, bdAbogZona, bdAbogUsuarioMev,
    validacionesGenerales,
    // llamo a la funcion crear
    abogadosController.crearRegistroAbog);

routesAbogados.put("/actualizar/:cuit", middlewareCuitNumero, abogadosController.actualizarRegistroAbog);

routesAbogados.delete("/borrar/:cuitParaBorrar", middlewareCuitNumero, abogadosController.borrarRegistroAbog);




module.exports = routesAbogados;