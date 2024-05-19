//abogadosSchema.js


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const abogado_schema_const = new Schema(
    {
        //atributo bd : {type: tipo dato}
        //bd_abog_cuit     27287535487    Int64 (Number)
        //bd_abog_nombre   "ABDALA Cristina Noemi"

        bd_abog_cuit: { type: Number, require: true, unique:true },
        bd_abog_nombre: { type: String },
        bd_abog_colegio: {
            tomo: { type: Number },
            folio: {type: Number }
        },
        bd_abog_sorteo_seteo: {
            asesor: {type: Boolean},
            defensor: {type: Boolean}, 
            zona_sorteo: {type: String}
        },
        bd_abog_contacto: {
            domicilio_electronico: {type: String},
            telefono_fijo: {type: String},
            celular: {type: String},
            email: {type: String}
        },
        bd_abog_domicilio: {
            particular: { type: String },
            legal: { type: String },
            constituido: {type: String}
        },
        bd_abog_horario_atencion: { type: String }, 
        bd_abog_usuario_mev: {type: String}        
    }
);

const bdAbogados = mongoose.model("abogados_collections", abogado_schema_const);
module.exports = bdAbogados;