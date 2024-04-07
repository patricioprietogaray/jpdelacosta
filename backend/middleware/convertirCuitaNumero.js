//middleware/convertirCuitaNumero.js

const convertirCuitaNumero = (req, res, next) => {
    const cuitString = req.params.cuit;
    // console.log("entro al middleware y el cuit es: " + cuitString);
    req.params.cuit = Number(cuitString);
    next();
}

module.exports = convertirCuitaNumero;