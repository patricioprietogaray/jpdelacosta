//tabla.js

import React, { useState } from 'react';
import CrudUpdate from './crudUpdate'; // Importa el componente CrudUpdate

const Tabla = ({ coleccion }) => {

    const [crudUpdateState, setCrudUpdateState] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    const muestraRegistro = (listaTabla) => {
        // alert("muestra el registro: " + listaTabla._id);
        setCrudUpdateState(true);
        setRegistroSeleccionado(listaTabla);
    }

    return (
        <>
            <table>
            <thead>
                <th>NOMBRE</th>
                <th>CUIT</th>
                <th>CELULAR</th>
                <th>USUARIO MEV</th>
            </thead>
            <tbody>
                {(coleccion.length>0)?
                    (coleccion.map(listaTabla => (
                        <tr key={listaTabla._id} onClick={()=>muestraRegistro(listaTabla)}>
                            <td className='nombreAbogado'>{listaTabla.bd_abog_nombre}</td>
                            <td className='cuitAbogado'>{listaTabla.bd_abog_cuit}</td>
                            <td>{listaTabla.bd_abog_celular}</td>
                            <td>{listaTabla.bd_abog_usuario_mev}</td>
                        </tr>
                    )))
                : <tr>
                            <td colspan="4" className='tablaUnicoTextoCentrado'>
                                <button>SIN DATOS QUE MOSTRAR: AGREGAR UN NUEVO REGISTRO</button>
                             </td>
                    </tr>}
                
                </tbody>
            </table>
            {
                crudUpdateState && (
                    <>
                        <CrudUpdate registro={registroSeleccionado} />
                    </>
            )}
        </>
    );
    
}

export default Tabla;
