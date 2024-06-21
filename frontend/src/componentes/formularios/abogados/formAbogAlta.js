//formAbogAlta.js

import React, { useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogAlta = ({ cerrarVentanaAgregarDesdeGeneral, todosLosDatos }) => {

    const host = '192.168.18.100';

    const [datosAcargar, setDatosAcargar] = useState({
        bd_abog_cuit: 'Sin Datos',
        bd_abog_nombre: 'Sin Datos',
        bd_abog_colegio: {
            tomo: 0,
            folio: 0
        },
        bd_abog_contacto: {
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

    const [nuevoAbogado, setNuevoAbogado] = useState(datosAcargar);

    

    //mensajes y errores desde el backend
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');


    // Función para manejar el cambio en el input
    const handlerChange = (event) => {
        
        //cargo clave-valor del textbox que tengo el foco
        const { name, value } = event.target;

        // Errror el input siempre queda con un caracter y no se puede borrar.
        // if (value.trim() !== '') {  //si el valor esta vacio
            
            if (!name.includes('.')) {  // si la clave no incluye punto (ej: bd_abog_cuit)
                setNuevoAbogado(prevState => ({ //leo todo el objeto nuevoAbogado
                    ...prevState,  // dejo todos los datos como estan
                    [name]: value  // y agrego uno nuevo 
                }));
            } else { // si la clave incluye punto (ej: bd_abog_colegio.tomo)

                // divido en dos constantes lo que separa el punto
                // del ejemplo anterior firstLevel (bd_abog_colegio)
                // secondLevel (tomo)

                const [firstLevel, secondLevel] = name.split('.');
                setNuevoAbogado(prevState => ({
                    ...prevState,  // dejo todos los datos como estan
                    [firstLevel]: {
                        ...prevState[firstLevel], //bd_abog_colegio se mantiene igual
                        [secondLevel]: value //tomo es modificado con su valor
                    }
                }));                
            }
        // }


        //setNuevoAbogado({ ...nuevoAbogado, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        //crear un objeto para actualizar los datos de una sola vez
        const newData = {
            bd_abog_cuit: nuevoAbogado.bd_abog_cuit >= 20000000000 ? nuevoAbogado.bd_abog_cuit : 'Sin Datos',
            bd_abog_nombre: nuevoAbogado.bd_abog_nombre !== '' ? nuevoAbogado.bd_abog_nombre : 'Sin Datos',
            bd_abog_usuario_mev: nuevoAbogado.bd_abog_usuario_mev !== '' ? nuevoAbogado.bd_abog_usuario_mev : 'Sin Datos',
            bd_abog_colegio: {
                tomo: nuevoAbogado.bd_abog_colegio.tomo !== 0 ? nuevoAbogado.bd_abog_colegio.tomo : 0,
                folio: nuevoAbogado.bd_abog_colegio.folio !== 0 ? nuevoAbogado.bd_abog_colegio.folio : 0
            },
            bd_abog_contacto: {
                domicilio_electronico: nuevoAbogado.bd_abog_contacto.domicilio_electronico !== '' ? nuevoAbogado.bd_abog_contacto.domicilio_electronico : 'Sin Datos',
                telefono_fijo: nuevoAbogado.bd_abog_contacto.telefono_fijo !== '' ? nuevoAbogado.bd_abog_contacto.telefono_fijo : 'Sin Datos',
                celular: nuevoAbogado.bd_abog_contacto.celular !== '' ? nuevoAbogado.bd_abog_contacto.celular : 'Sin Datos',
                email: nuevoAbogado.bd_abog_contacto.email !== '' ? nuevoAbogado.bd_abog_contacto.email : 'Sin Datos'
            }
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
            .filter(key => newData[key] !== 'Sin Datos' )
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
            //actualizar los datos de la tabla en AbogGeneral
            todosLosDatos();
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
                        <label>CUIT: </label>
                        <input
                            className='anchoMediano  espaciado'
                            name='bd_abog_cuit'
                            value={Number(nuevoAbogado.bd_abog_cuit)}
                            onChange={handlerChange}
                        />
                    </div>                    
                    <div>
                        <label>Apellidos y Nombres: </label>
                        <input
                            className='anchoGrande espaciado'
                            name='bd_abog_nombre'
                            value={nuevoAbogado.bd_abog_nombre}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Tomo: </label>
                        <input
                            className='anchoChico espaciado textoDerecha'
                            name='bd_abog_colegio.tomo'
                            value={Number(nuevoAbogado.bd_abog_colegio.tomo)}
                            onChange={handlerChange}
                        />
                    </div>
                    <div>
                        <label>Folio: </label>
                        <input
                            className='anchoChico espaciado textoDerecha'
                            name='bd_abog_colegio.folio'
                            value={Number(nuevoAbogado.bd_abog_colegio.folio)}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Electrónico: </label>
                        <input
                            className='anchoGrande espaciado'
                            name='bd_abog_contacto.domicilio_electronico'
                            value={nuevoAbogado.bd_abog_contacto.domicilio_electronico}
                            onChange={handlerChange}
                        />
                    </div>
                </section>                
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Teléfono fijo: </label>
                        <input
                            className='anchoMediano espaciado'
                            name='bd_abog_contacto.telefono_fijo'
                            value={nuevoAbogado.bd_abog_contacto.telefono_fijo}
                            onChange={handlerChange}
                        />
                    </div>
                    <div>
                        <label>Celular: </label>
                        <input
                            className='anchoMediano espaciado'
                            name='bd_abog_contacto.celular'
                            value={nuevoAbogado.bd_abog_contacto.celular}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>E-Mail: </label>
                        <input
                            className='anchoGrande espaciado'
                            name='bd_abog_contacto.email'
                            value={nuevoAbogado.bd_abog_contacto.email}
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
