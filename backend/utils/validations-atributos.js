//utils/validations-atributos.js

const { check } = require("express-validator");

const bdAbogCUIT = check("bd_abog_cuit")
    .notEmpty().withMessage("El atributo CUIT no debe estar vacío o debe ser cero");

const bdAbogNombre = check("bd_abog_nombre")
    .notEmpty().withMessage("El atributo NOMBRE no debe estar vacío");

const bdAbogTomo = check("bd_abog_tomo")
    .notEmpty().withMessage("El atributo TOMO no debe estar vacío");

const bdAbogFolio = check("bd_abog_folio")
    .notEmpty().withMessage("El atributo FOLIO no debe estar vacío");

const bdAbogDomicilioReal = check("bd_abog_domicilio_real")
    .notEmpty().withMessage("El atributo DOMICILIO REAL no debe estar vacío");

const bdAbogTelefono = check("bd_abog_telefono_fijo")
    .notEmpty().withMessage("El atributo TELEFONO FIJO no debe estar vacío");

const bdAbogCelular = check("bd_abog_celular")
    .notEmpty().withMessage("El atributo CELULAR no debe estar vacío");

const bdAbogCorreoElectrónico = check("bd_abog_email")
    .notEmpty().withMessage("El atributo CORREO ELECTRÓNICO PERSONAL no debe estar vacío");

const bdAbogDomicilioElectronico = check("bd_abog_domicilio_electronico")
    .notEmpty().withMessage("El atributo DOMICILIO ELECTRÓNICO no debe estar vacío");

const bdAbogAsesor = check("bd_abog_asesor")
    .notEmpty().withMessage("El atributo ASESOR no debe estar vacío");

const bdAbogDefensor = check("bd_abog_defensor")
    .notEmpty().withMessage("El atributo DEFENSOR no debe estar vacío");

const bdAbogDomicilioLegal = check("bd_abog_domicilio_legal")
    .notEmpty().withMessage("El atributo DOMICILIO LEGAL no debe estar vacío");

const bdAbogHorarioAtencion = check("bd_abog_horario_atencion")
    .notEmpty().withMessage("El atributo HORARIO DE ATENCION no debe estar vacío");

const bdAbogZona = check("bd_abog_zona")
    .notEmpty().withMessage("El atributo ZONA no debe estar vacío");

module.exports = {
    bdAbogCUIT, bdAbogNombre,
    bdAbogTomo, bdAbogFolio, bdAbogDomicilioReal, bdAbogTelefono,
    bdAbogCelular, bdAbogCorreoElectrónico, bdAbogDomicilioElectronico,
    bdAbogDefensor, bdAbogDomicilioLegal, bdAbogHorarioAtencion,
    bdAbogZona, bdAbogAsesor};

