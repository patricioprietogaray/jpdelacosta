//formAbogAlta.js

import React, { useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogAlta = ({ cerrarVentanaAgregarDesdeGeneral, todosLosDatos }) => {

    const host = '192.168.18.100';

    const initialState = {
        bd_abog_cuit: 0, 
        bd_abog_nombre: '',
        bd_abog_usuario_mev: ''
    };

    const [nuevoAbogado, setNuevoAbogado] = useState(initialState);

    const [datosAcargar, setDatosAcargar] = useState({
        bd_abog_cuit: 'Sin Datos',
        bd_abog_nombre: 'Sin Datos',
        bd_abog_colegio: {
            tomo: 'Sin Datos',
            folio: 'Sin Datos'
        },
        bd_agog_contacto: {
            domicilio_electronico: 'Sin Datos',
            telefono_fijo: 'Sin Datos',
            celular: 'Sin Datos',
            email: 'Sin Datos'
        },
        bd_abog_horario_atencion: 'Sin Datos',
        bd_abog_domicilio: {
            particular: 'Sin Datos',
            legal: 'Sin Datos',
            constituido: 'Sin Datos'
        },
        bd_abog_usuario_mev: 'Sin Datos'
    });

    //mensajes y errores desde el backend
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');


    // Función para manejar el cambio en el input
    const handlerChange = (event) => {
        const { name, value } = event.target;
        setNuevoAbogado({ ...nuevoAbogado, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        //crear un objeto para actualizar los datos de una sola vez
        const newData = {
            bd_abog_cuit: nuevoAbogado.bd_abog_cuit >= 20000000000 ? nuevoAbogado.bd_abog_cuit : 'Sin Datos',
            bd_abog_nombre: nuevoAbogado.bd_abog_nombre !== '' ? nuevoAbogado.bd_abog_nombre : 'Sin Datos',
            bd_abog_usuario_mev: nuevoAbogado.bd_abog_usuario_mev !== '' ? nuevoAbogado.bd_abog_usuario_mev : 'Sin Datos'
        };

        // en vez de agregar de a uno, de esta manera SALTAN TODOS LOS ERRORES ....
        // if (nuevoAbogado.bd_abog_nombre !== '') {
            // alert(`Nombre del abogado: ${nuevoAbogado.bd_abog_nombre}`);
            // setDatosAcargar({
                // ...datosAcargar,
                // bd_abog_nombre: nuevoAbogado.bd_abog_nombre
            // });
        // } else {
            // setDatosAcargar({
                // ...datosAcargar,
                // bd_abog_nombre: 'Sin datos'
            // });
        // }
        
   

        //console.log(datosAcargar);

        //actualizo los datosAcargar eon el nuevo objeto newData
        setDatosAcargar(newData);


        // Filtramos newData para eliminar las entradas con valor 'Sin datos'
        const filteredData = Object.keys(newData)
            .filter(key => newData[key] !== 'Sin Datos')
            .reduce((obj, key) => {
                obj[key] = newData[key];
                return obj;
            }, {});

        // Llamada a Axios para enviar los datos filtrados al servidor
        try {
            const response = await axios.post(`http://${host}:3001/abogados/crear`, filteredData);
            //console.log('Respuesta del servidor:', response.data);
            //mostrar el mensaje (msg) que viene del backend
            setMensajeParaMostrar(response.data.msg); 
            // no muestro errores
            setErrorParaMostrar('');
        } catch (error) {
            //console.error('Error al enviar los datos:', error);
            setMensajeParaMostrar('');
            setErrorParaMostrar(`Error al enviar la solicitud: ${error.message}.`);
        }
    };

    // Función para cerrar la ventana
    const handlerVolverClic = () => {
        cerrarVentanaAgregarDesdeGeneral();
    };

    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <article>Crear un nuevo registro</article>
                <article className='close-button' onClick={handlerVolverClic}></article>
            </section>
            <form onSubmit={handleSubmit}>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Apellidos y Nombres: </label>
                        <input
                            className='anchoGrande espaciado'
                            name='bd_abog_nombre'
                            value={nuevoAbogado.bd_abog_nombre}
                            onChange={handlerChange}
                        />
                    </div>
                    <div>
                        <label>CUIT: </label>
                        <input
                            className='anchoMediano  espaciado'
                            name='bd_abog_cuit'
                            value={nuevoAbogado.bd_abog_cuit}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <button type="submit">Submit</button>
            </form>
            {mensajeParaMostrar && <div className='tablaUnicoTextoCentrado'>{mensajeParaMostrar}</div>}
            {errorParaMostrar &&
                <div className='tablaUnicoTextoCentrado'>{errorParaMostrar}</div>}
        </div>
    );
};

export default FormAbogAlta;
