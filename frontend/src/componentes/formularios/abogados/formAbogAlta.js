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
        bd_abog_usuario_mev: 'Sin Datos',
        bd_abog_sorteado: false,
        bd_abog_proximo_sorteo: false
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
        event.preventDefault(); //previene la actualizacion del formulario
      
        //Funcion para filtrar los valores 'Sin Datos'
        const filterSinDatos = (value) => {
            if (typeof value == 'string' && value.trim() === 'Sin Datos') {
                return null;
            } else if (typeof value === 'object') {
                const filteredObj = {};
                Object.keys(value).forEach(key => {
                    const filteredValue = filterSinDatos(value[key]);
                    if (filteredValue !== null) {
                        filteredObj[key] = filteredValue;
                    }
                });
                return Object.keys(filteredObj).length > 0 ? filteredObj : null;
            }
            return value;
        };

        let newData = {}; //Crear un objeto para almacenar los nuevos datos

        Object.keys(nuevoAbogado).forEach(key => {
            const filteredValue = filterSinDatos(nuevoAbogado[key]);
            if (filteredValue !== null) {
                newData[key] = filteredValue;
            }
        });

        //Iterar sobre cada atributo de nuevoAbogado y actualizar newData
        // Object.keys(nuevoAbogado).forEach(key => {
        //     let value = nuevoAbogado[key];  //cargo el valor
        //     alert(`No es un objeto: atributo: ${key}, valor: ${value}`);
        //     //Verificar si el valor es una cadena vacia, reemplazar con 'Sin Datos'
        //     if (typeof value == 'string' && value.trim() === '') {
        //         value = 'Sin Datos';
        //     }
            // hasta aca no entra a los objetos
            
            //si es un objeto, iterar tambien sobre sus claves
            // if (typeof value === 'object') {
            //     const updateObj = {};
            //     Object.keys(value).forEach(innerKey => {
            //         let innerValue = value[innerKey];
            //         if (typeof innerValue === 'string' && innerValue.trim() === '') {
            //             innerValue = 'Sin Datos';
            //         }
            //         updateObj[innerKey] = innerValue;
            //         alert('objeto ' + updateObj[innerKey]);
            //     });
            //     value = updateObj;
            // })};

            // Agregar al newData solo si el valor no es 'Sin Datos'     --- NO FUNCA
            // if (value !== 'Sin Datos') {
            //     newData[key] = value;
            // }

            //newData[key] = value;
            // alert(key+': '+newData[key]);



            // Iterar sobre cada atributo de nuevoAbogado y aplicar el filtro
            // Object.keys(nuevoAbogado).forEach(key => {
            //     const filteredValue = filterSinDatos(nuevoAbogado[key]);
            //     if (filteredValue !== null) {
            //         newData[key] = filteredValue;
            //     }
            // });

        // Llamada a Axios para enviar los datos filtrados al servidor
        try {
            const response = await axios.post(`http://${host}:3001/abogados/crear`, newData);
            //console.log('Respuesta del servidor:', response.data);
            //mostrar el mensaje (msg) que viene del backend
            setMensajeParaMostrar(response.data.msg); 
            // no muestro errores
            setErrorParaMostrar('');
            todosLosDatos(); //actualizar los datos de la tabla en AbogGeneral
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
                <h4>Crear un nuevo registro</h4>
                <article className='close-button' onClick={handlerVolverClic}></article>
            </section>
            <form onSubmit={handleSubmit}>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>CUIT: </label>
                        <input
                            className='anchoMediano espaciado'
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
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Particular: </label>
                        <input
                            className='anchoGrandisimo espaciado'
                            name='bd_abog_domicilio.particular'
                            value={nuevoAbogado.bd_abog_domicilio.particular}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Legal: </label>
                        <input
                            className='anchoGrandisimo espaciado'
                            name='bd_abog_domicilio.legal'
                            value={nuevoAbogado.bd_abog_domicilio.legal}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Constituido: </label>
                        <input
                            className='anchoGrandisimo espaciado'
                            name='bd_abog_domicilio.constituido'
                            value={nuevoAbogado.bd_abog_domicilio.constituido}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Horario de atención: </label>
                        <input
                            className='anchoGrandisimo espaciado'
                            name='bd_abog_horario_atencion'
                            value={nuevoAbogado.bd_abog_horario_atencion}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Usuario M.E.V.: </label>
                        <input
                            className='anchoMediano espaciado'
                            name='bd_abog_usuario_mev'
                            value={nuevoAbogado.bd_abog_usuario_mev}
                            onChange={handlerChange}
                        />
                    </div>
                </section>
                <button type="submit">Agregar</button>
            </form>
            {mensajeParaMostrar && <div className='tablaUnicoTextoCentrado'>{mensajeParaMostrar}</div>}
            {errorParaMostrar &&
                <div className='tablaUnicoTextoCentrado'>{errorParaMostrar}</div>}
        </div>
    );
};

export default FormAbogAlta;
