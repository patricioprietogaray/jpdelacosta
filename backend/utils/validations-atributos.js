//utils/validations-atributos.js

const { check } = require("express-validator");

const bdAbogCUIT = check("bd_abog_cuit")
    .notEmpty().withMessage("El atributo CUIT no debe estar vacío o debe ser cero")
    .isNumeric().withMessage("El atributo CUIT debe ser numerico sin guiones!");

// const bdAbogNombre = check("bd_abog_nombre")
//     .notEmpty().withMessage("El atributo NOMBRE no debe estar vacío");

// const bdAbogTomo = check("bd_abog_tomo")
//     .notEmpty().withMessage("El atributo TOMO no debe estar vacío")
//     .isNumeric().withMessage("El atributo TOMO debe ser numerico (sistema decimal, no romano)");

// const bdAbogFolio = check("bd_abog_folio")
//     .notEmpty().withMessage("El atributo FOLIO no debe estar vacío")
//     .isNumeric().withMessage("El atributo FOLIO debe ser numerico");

// const bdAbogTelefono = check("bd_abog_telefono_fijo")
//     .notEmpty().withMessage("El atributo TELEFONO FIJO no debe estar vacío");

// const bdAbogCelular = check("bd_abog_celular")
//     .notEmpty().withMessage("El atributo CELULAR no debe estar vacío");

// const bdAbogCorreoElectrónico = check("bd_abog_email")
//     .notEmpty().withMessage("El atributo CORREO ELECTRÓNICO PERSONAL no debe estar vacío")
//     .isEmail().withMessage("El atributo CORREO ELECTRÓNICO PERSONAL debe tener formato de email");

// const bdAbogDomicilioElectronico = check("bd_abog_domicilio_electronico")
//     .notEmpty().withMessage("El atributo DOMICILIO ELECTRÓNICO no debe estar vacío")
//     .isEmail().withMessage("El atributo DOMICILIO ELECTRÓNICO debe tener formato de email");

// const bdAbogAsesor = check("bd_abog_asesor")
//     .notEmpty().withMessage("El atributo ASESOR no debe estar vacío")
//     .isBoolean().withMessage("El atributo ASESOR debe ser de tipo booleano");

// const bdAbogDefensor = check("bd_abog_defensor")
//     .notEmpty().withMessage("El atributo DEFENSOR no debe estar vacío")
//     .isBoolean().withMessage("El atributo DEFENSOR debe ser de tipo booleano");;

// const bdAbogDomicilioLegal = check("bd_abog_domicilio.legal")
//     .notEmpty().withMessage("El atributo DOMICILIO LEGAL no debe estar vacío");

// const bdAbogDomicilioParticular = check("bd_abog_domicilio.particular")
//     .notEmpty().withMessage("El atributo DOMICILIO PARTICULAR no debe estar vacío");

// const bdAbogDomicilioConstituido = check("bd_abogado_domicilio.constituido")
//     .notEmpty().withMessage("El atributo DOMICILIO CONSTITUIDO no debe estar vacío");

// const bdAbogHorarioAtencion = check("bd_abog_horario_atencion")
//     .notEmpty().withMessage("El atributo HORARIO DE ATENCION no debe estar vacío");

// const bdAbogZona = check("bd_abog_zona")
//     .notEmpty().withMessage("El atributo ZONA no debe estar vacío");

// const bdAbogUsuarioMev = check("bd_abog_usuario_mev")
//     .notEmpty().withMessage("El atributo USUARIO MEV no debe estar vacío");

module.exports = {
    bdAbogCUIT,
    // bdAbogNombre,
    // bdAbogTomo, bdAbogFolio, bdAbogDomicilioReal, bdAbogTelefono, 
    // bdAbogCelular, bdAbogCorreoElectrónico, bdAbogDomicilioElectronico,
    // bdAbogDomicilioParticular,
    // bdAbogDefensor,
    // bdAbogDomicilioLegal, 
    // bdAbogDomicilioConstituido,

    // bdAbogHorarioAtencion, bdAbogZona, bdAbogAsesor, bdAbogUsuarioMev
};

