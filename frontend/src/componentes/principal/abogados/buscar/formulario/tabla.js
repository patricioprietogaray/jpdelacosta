//tabla.js

import React, { useState } from 'react';

// Importa el componente verRegistro
import VerRegistro from './verRegistro';

// importo el componente altaRegistro
import AltaRegistro from "./altaRegistro";


const Tabla = ({ coleccion }) => {

    const [verRegistroVentanaVisible, setVerRegistroVentanaVisible] = useState(false);
    const [altaRegistroVentanaVisible, setAltaRegistroVentanaVisible] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

    const muestraRegistro = (listaTabla) => {
        // alert("muestra el registro: " + listaTabla._id);
        setVerRegistroVentanaVisible(true);
        setRegistroSeleccionado(listaTabla);
    }

    const altaDeRegistro = () => {
        setAltaRegistroVentanaVisible(true);
    }

    // permite el cierre de la ventana desde el subcomponente 
    //PARA TODOS LOS SUBCOMPONENTES!!!
    const handlerCloseVentana=()=>{
        setVerRegistroVentanaVisible(false);
        setAltaRegistroVentanaVisible(false);
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
                            <button onClick={altaDeRegistro}>SIN DATOS QUE MOSTRAR: AGREGAR UN NUEVO REGISTRO</button>
                        </td>
                    </tr>}
                
                </tbody>
            </table>
            { verRegistroVentanaVisible && (
                <>
                    <VerRegistro registro={registroSeleccionado} cerrarVentana={handlerCloseVentana} />
                    {/* paso la funcion para que pueda interactuar desde el subcomponente */}
                </>
            )}
            {altaRegistroVentanaVisible && (
                <>
                    <AltaRegistro cerrarVentana={handlerCloseVentana} />
                </>
            )}
        </>
    );
    
}

export default Tabla;
