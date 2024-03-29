const abogadoSchema = require("../models/abogadosSchema");

// Crud -> Create

const crearRegistroAbog = async (req, res) => {
    try {
        const busquedaCUIT = req.body.bd_abog_cuit;
        const encontrarAbogadoCargado = await abogadoSchema.findOne(
            { bd_abog_cuit: busquedaCUIT }
        );
        if (encontrarAbogadoCargado === null) { //si no existe el cuit
            // const crearRegAbog = await abogadoSchema.create(req.body);
            await abogadoSchema.create(req.body); //prepara los datos
            res.status(201).json({ msg: "Abogado agregado con éxito!" }); //guarda nvo abogado
        } else {
            res.status(200).json({ msg: "El registro existe!" });
        }
    } catch (error) {
        res.status(200).json({ msg: "El servidor no responde: "+error.message });
    }
}


// cRud -> Read
const todosLosAbogados = async (_, res) => {
    try {
        const todosAbog = await abogadoSchema.find();
        res.status(200).json({ abogados_collections: todosAbog, msg: "Proceso exitoso!" });
    } catch (error) {
        res.status(500).json({ abogados_collections: [], msg: "Sin conexión al servidor!" });
    }
}
 
const unAbogadoPorCuit = async (req, res) => {
    try {
        const unSoloAbogado = await abogadoSchema.find(
            {bd_abog_cuit: Number(req.params.cuit)}
        );
        if (unSoloAbogado) {
            // encontró al abogado
            res.status(200).json({ abogados_collections: unSoloAbogado, msg: "Proceso exitoso!" });
        } else {
            res.status(404).json({ abogados_collections: [], msg: "Sin datos que mostrar!" });
        }
        
    } catch (error) {
        res.status(500).json({ abogados_collections: [], msg: "Sin conexión al servidor!" });
    }
}


const abogadosPorNombre = async (req, res) => {
    try {
        // busqueda de un texto dentro de una cadena de caracteres
        const regex = new RegExp(req.params.nombre, 'i'); // 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas
        const abogados = await abogadoSchema.find({ bd_abog_nombre: regex });
        
        if (abogados.length > 0) {
            res.status(200).json({ abogados_collections: abogados , msg: "Proceso exitoso!" });
        } else {
            res.status(404).json({ abogados_collections: [], msg: "Sin datos que mostrar!" });
        }
        
    } catch (error) {
        res.status(500).json({ abogados_collections: [], msg: "Sin conexión al servidor!" });
    }
}

const abogadosPorZona = async (req, res) => {
    try {
        // busqueda de un texto dentro de una cadena de caracteres
        const regex = new RegExp(req.params.zona, 'i'); // 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas
        const abogadosZona = await abogadoSchema.find({ bd_abog_zona: regex });
        
        if (abogadosZona.length > 0) {
            res.status(200).json({ abogados_collections: abogadosZona , msg: "Proceso exitoso!" });
        } else {
            res.status(404).json({ abogados_collections: [], msg: "Sin datos que mostrar!" });
        }
        
    } catch (error) {
        res.status(500).json({ abogados_collections: [], msg: "Sin conexión al servidor!" });
    }

}

// crUd -> Update
// se puede acutalizar cualquier atributo cuit incluido (por no ser el id)
const actualizarRegistroAbog = async (req, res) => {
    try {
        const buscarCUIT = req.params.cuit;
        // console.log("buscarCUIT "+buscarCUIT);
        const abogadoEncontrado = await abogadoSchema.findOne(
            {bd_abog_cuit: buscarCUIT}
        );
        // console.log("abogado encontrado: " + abogadoEncontrado);

        //if (abogadoEncontrado.$isEmpty()) {   no se usa isEmpty()
        if(abogadoEncontrado) {
            const actualizarAbogado = await abogadoSchema.findByIdAndUpdate(
                abogadoEncontrado._id, //ser usa _id para 
                                        //identificar el registro a actualizar
                req.body,
                {new: true} //Esto devuelve el documento luego de actualizarlo actualizado
            );
            res.status(201).json({ msg: `Se actualizó el abogado ${actualizarAbogado}.` });
        } else {
            // envio mensaje por res -> para el frontend?
            res.send(`No se encontró el abogado buscado!`);
        }
    } catch (error) {
        res.status(500).json({ msg: `Error en actualizar, el servidor no responde! - ${error.message}.` });
    }
}

//cruD -> Delete
const borrarRegistroAbog = async (req, res) => {
    try {
        const buscarCUIT = req.params.cuitParaBorrar;
        const abogadoEncontrado = await abogadoSchema.findOne(
            { bd_abog_cuit: buscarCUIT }
        );
        if (abogadoEncontrado === null) {
            res.status(404).json(
                { msg: `Status (404) - No se encontró el abogado (CUIT: ${buscarCUIT})` }
            );
        }
        if (abogadoEncontrado) {
            //borro el abogado
            const abogadoBorrado = await abogadoSchema.findByIdAndDelete(abogadoEncontrado);
            if (abogadoBorrado) {
                // res.status(200).json(
                //     { msg: `Status (200) - Se encontró el abogado (CUIT: ${buscarCUIT})` }
                // );
                //borro el abogado
                res.status(200).json({ abogadoBorrado: abogadoBorrado, msg: `Abogado se ha borrado exitosamente!` });
                console.log("abogadoBorrado: " + abogadoBorrado);
            }
            
            
        }
        console.log("abogadoEncontrado: "+abogadoEncontrado);
        // Aquí puedes agregar más lógica si es necesario
        // Por ejemplo, borrar el registro si se encuentra, etc.
    } catch (error) {
        res.status(500).json(
            { msg: `Error al buscar el libro, el servidor no responde!: ${error.message}` }
        );
    }
}


module.exports = {
    crearRegistroAbog, todosLosAbogados,
    actualizarRegistroAbog, borrarRegistroAbog,
    unAbogadoPorCuit, abogadosPorNombre,
    abogadosPorZona
}