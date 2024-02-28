const convertirCuitaNumero = (req, res, next) => {
    const cuitString = req.params.cuit;
    req.params.cuit = Number(cuitString);
    next();
}

module.exports = convertirCuitaNumero;