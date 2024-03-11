const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const abogado_schema_const = new Schema(
    {
        //atributo bd : {type: tipo dato}
        //bd_abog_cuit     27287535487    Int64 (Number)
        //bd_abog_nombre   "ABDALA Cristina Noemi"

        bd_abog_cuit: { type: Number },
        bd_abog_nombre: { type: String },
        bd_abog_tomo: { type: Number },
        bd_abog_folio: { type: Number },
        bd_abog_asesor: { type: Boolean },
        bd_abog_defensor: { type: Boolean },
        bd_abog_domicilio_electronico: { type: String },
        bd_abog_email: { type: String },
        bd_abog_horario_atencion: { type: String }, 
        bd_abog_domicilio_real: { type: String },
        bd_abog_celular: { type: String },
        bd_abog_telefono_fijo: { type: String },
        bd_abog_zona: { type: String },
        bd_abog_domicilio_legal: { type: String },
        bd_agog_usuario_mev: {type: String}        
    }
);

const bdAbogados = mongoose.model("abogados_collections", abogado_schema_const);
module.exports = bdAbogados;