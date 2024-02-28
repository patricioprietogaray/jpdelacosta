//middleware/validacionesGenerales.js

const { body, validationResult } = require("express-validator");

const validacionesGenerales = (req, res, next) => {
    const Error = validationResult(req);

    if (Error.isEmpty()) {
        return next();
    } else {
        const mostrarListaErrores = [];
        Error.array().map(err => mostrarListaErrores.push({
            [err.params]: err.msg + " - Error en el texto ingresado: " + err.value
        }));
        // 400 muestra el error
        res.status(400).json(
            {
                msg: `Error en la validación: 
                    ${Error.array().map(
                        e => e.type + " - " + e.value + ": " + e.msg + ";   "
                    )}`
            });
    }
}

module.exports = { validacionesGenerales, body };