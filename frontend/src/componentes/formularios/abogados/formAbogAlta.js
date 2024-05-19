//formAbogAlta.js

import React, { useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogAlta = ({ cerrarVentanaAgregarDesdeGeneral, todosLosDatos }) => {
    
    const host = "192.168.18.100";

    // al cerrar la ventana envio info al padre para que se cierre solo esta ventana!
    const handlerVolverClick = () => {
        cerrarVentanaAgregarDesdeGeneral();
        // alert("cierro ventana (formAbogAlta)");
    }

    const initialState = {
        bd_abog_cuit: 0,
        bd_abog_nombre: 'Pepe Argento',
        bd_abog_colegio: {
            tomo: 10,
            folio: 10
        },
        bd_abog_sorteo_seteo: {
            asesor: false,
            defensor: false,
            zona_sorteo: 'sur'
        },
        bd_abog_contacto: {
            domicilio_electronico: '123@notificaciones',
            telefono_fijo: '022',
            celular: '033',
            email: '123@gmail.com'
        },
        bd_abog_horario_atencion: 'Lun a Vier 8 a 14 hs',
        bd_abog_domicilio: {
            particular: 'Espora 123',
            legal: 'Azopardo 123',
            constituido: 'Quinterooooo'
        },
        bd_abog_usuario_mev: 'pear'
    }

    //atributos
    const [nuevoAbogado, setNuevoAbogado] = useState(initialState);
    //errores
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');
    const [presionoCancelar, setPresionoCancelar] = useState(false);

    //al modificar el input (todos)
    const handleChange = (event) => {
        
        //const { name, value } = event.target;
        // hay subniveles --> bd_abog_domicilio.legal
        //if (name.includes('.')) {
        //    const [firstLevel, secondLevel] = name.split('.');
        //    setNuevoAbogado(prevState=>({
        //        ...prevState,
        //        [firstLevel]: {
        //            ...prevState[firstLevel],
        //            [secondLevel]: value
        //        }
        //    }));
        //} else {
        //    // no hay subniveles --> bd_abog_cuit
        //    setNuevoAbogado(prevState=> ({
        //       ...prevState,
        //        [name]: value
        //    }));
        //}



        // const { name, value } = event.target;

        // si estamos en el item raiz
        // bd_abog_cuit, bd_abog_nombre, bd_abog_horario_atencion, bd_abog_usuario_mev
    
        // if (!name.includes('.')) {
            // setNuevoAbogado(prevState => ({
                // ...prevState,
                // [name]: value
            // }));
            // console.log('first level: ' + name);
        // } else {
            // const { firstLevel, secondLevel } = name.split('.');
            // console.log('first level: ' + firstLevel + ', second level: ' + secondLevel);
            // console.log(name);
            // console.log(name.split('.'));
            // const [ firstLevel, secondLevel ] = name.split('.');
            // console.log('first level: ' + firstLevel + ', second level: ' + secondLevel);
            // console.log('first level: ' + name.split('.')[0] + ', second level: ' + name.split('.')[1]);
            // setNuevoAbogado(prevState => ({
                // ...prevState,
                // [firstLevel]: {
                    // [secondLevel]: value
                // }
            // }));
            // console.log('nombre: ' + nuevoAbogado.bd_abog_nombre);
            // console.log('tomo: ' + nuevoAbogado.bd_abog_colegio.tomo);
            // console.log('folio: ' + nuevoAbogado.bd_abog_colegio.folio);
            // console.log('dom part: ' + nuevoAbogado.bd_abog_domicilio.particular);
            // console.log('prevState nombre: ' + nuevoAbogado.bd_abog_colegio.folio);


        // }
        
        

        // Función para dividir el nombre del campo en niveles
        // const getNestedValue = (fieldName, valueToUpdate, rootState) => {
        //     const fieldLevels = fieldName.split('.');
        //     let nestedValue = { ...rootState };
        //     for (let i = 0; i < fieldLevels.length; i++) {
        //         const level = fieldLevels[i];
        //         if (i === fieldLevels.length - 1) {
        //             // Último nivel, actualiza el valor
        //             nestedValue[level] = valueToUpdate;
        //         } else {
        //             // Sigue descendiendo en los niveles anidados
        //             nestedValue[level] = { ...nestedValue[level] };
        //             nestedValue = nestedValue[level];
        //         }
        //     }
        //     return nestedValue;
        // };

        // // Actualiza el estado según el nombre del campo
        // setNuevoAbogado(prevState => {
        //     // Verifica si el campo está anidado
        //     if (name.includes('.')) {
        //         // Campo anidado, actualiza el valor anidado
        //         const nestedValue = getNestedValue(name, value, prevState);
        //         // alert(`campo anidado: ${name}, ${value}`);
        //         return {
        //             ...prevState,
        //             ...nestedValue
        //         };
        //     } else {
        //         // Campo no anidado, actualiza el valor directamente
        //         // alert(`campo no anidado: ${name}, ${value}`);
        //         return {
        //             ...prevState,
        //             [name]: value
        //         };
        //     }
        // });
        
        
        const { name, value } = event.target;

        if (value.trim() === '') {
            if (!name.includes('.')) {
                setNuevoAbogado(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            } else {
                const [ firstLevel, secondLevel ] = name.split('.');
                setNuevoAbogado(prevState => ({
                    ...prevState,
                    [firstLevel]: {
                        ...prevState[firstLevel],
                        [secondLevel]: value
                    }
                }));
            //console.log('particular: ' + nuevoAbogado.bd_abog_domicilio.particular);
            }
        }
    };
    
    const limpiarInputs = () => {
        setNuevoAbogado(initialState);
        setPresionoCancelar(true);
    }

    //nuevo registro
    const handleSubmit = async (event) => {
        //no acutliza el form para no perder info
        event.preventDefault(); 
        try {
            // Checkbox: Verifica y ajusta los valores booleanos 
            // según sea necesario antes de enviarlos al servidor
            const datasEnviados = {
                ...nuevoAbogado


                //para no poner datos ni su campo
                // Omitir el campo "telefono_fijo" si está vacío
                //...nuevoAbogado.bd_abog_contacto.telefono_fijo && { bd_abog_contacto: { ...nuevoAbogado.bd_abog_contacto, telefono_fijo: nuevoAbogado.bd_abog_contacto.telefono_fijo } }
                //  En este ejemplo, se utiliza una expresión lógica corta para verificar
                    // si el campo "telefono_fijo" está vacío 
                    // (nuevoAbogado.bd_abog_contacto.telefono_fijo && 
                       // { bd_abog_contacto: 
                            // { ...nuevoAbogado.bd_abog_contacto, telefono_fijo: nuevoAbogado.bd_abog_contacto.telefono_fijo }
        // }).Si el campo no está vacío, se incluirá en los datos enviados al servidor; 
        // de lo contrario, se omitirá y no se incluirá en los datos enviados.
        // Esto garantiza que el campo "telefono_fijo" no se almacenará en la base de 
        // datos si está vacío.

                // ,
                // bd_abog_asesor: nuevoAbogado.bd_abog_sorteo_seteo.asesor === true ? true : false,
                // bd_abog_defensor: nuevoAbogado.bd_abog_sorteo_seteo.defensor === true ? true : false,
            };
            
            const respuestaAlta = await axios.post(
                `http://${host}:3001/abogados/crear`, datasEnviados);
                    
            // const respuestaAlta = await axios.post(
                // 'http://localhost:3001/abogados/crear', nuevoAbogado);
            //muestro el mensaje configurado desde el servidor
            setMensajeParaMostrar(respuestaAlta.data.msg);
            setErrorParaMostrar('');
            //actualizo los datos de la tabla en AbogGeneral
            todosLosDatos();
        } catch (error) {
            setMensajeParaMostrar('');
            if (error.response) {
                //error de respuesta del servidor
                const errorMsg = error.response.data.msg;
                setErrorParaMostrar(`Error en el servidor: ${errorMsg}.`);
            } else if (error.request) {
                //no se recibe respuesta del servidor
                setErrorParaMostrar(`No se pudo conectar con el servidor.`);
            } else {
                //otro tipo de error
                setErrorParaMostrar(`Error al enviar la solicitud: ${error.message}.`);
            }
        }
    }
    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <article>
                    <h4>Crear un nuevo registro</h4>
                </article>
                {/* modifico los parametros de la funcion que es pasada por props 
                para el cierre de la ventana */}
                <article className='close-button' onClick={()=>handlerVolverClick()}>
                </article>
            </section>
            
            <form onSubmit={handleSubmit}>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>APELLIDOS y Nombres: </label>
                        <input className='anchoGrande espaciado' name='bd_abog_nombre' value={nuevoAbogado.bd_abog_nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Tomo: </label>
                        <input
                            className='anchoChico textoDerecha espaciado'
                            name='bd_abog_colegio.tomo'
                            value={nuevoAbogado.bd_abog_colegio.tomo}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Folio: </label>
                        <input className='anchoChico textoDerecha espaciado' name='bd_abog_colegio.folio' value={nuevoAbogado.bd_abog_colegio.folio} onChange={handleChange} />
                    </div>
                    <div>
                        <label>C.U.I.T.: </label>
                        <input className='anchoMediano espaciado' name='bd_abog_cuit' value={nuevoAbogado.bd_abog_cuit} onChange={handleChange}  />
                    </div>
                </section>

                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Particular: </label>
                        <input className='anchoGrandisimo espaciado' name='bd_abog_domicilio.particular' value={nuevoAbogado.bd_abog_domicilio.particular} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Domicilio Legal: </label>
                        <input className='anchoGrandisimo espaciado' name='bd_abog_domicilio.legal' value={nuevoAbogado.bd_abog_domicilio.legal} onChange={handleChange} />
                    </div>   
                </section>


                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Teléfono Fijo: </label>
                        <input className='anchoMediano espaciado' name='bd_abog_contacto.telefono_fijo' value={nuevoAbogado.bd_abog_contacto.telefono_fijo} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Celular: </label>
                        <input className='anchoMediano espaciado' name='bd_abog_contacto.celular' value={nuevoAbogado.bd_abog_contacto.celular} onChange={handleChange} />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>E - Mail: </label>
                        <input className='anchoGrande espaciado' name='bd_abog_contacto.email' value={nuevoAbogado.bd_abog_contacto.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Domiclio Electrónico: </label>
                        <input className='anchoGrande espaciado' name='bd_abog_contacto.domicilio_electronico' value={nuevoAbogado.bd_abog_contacto.domicilio_electronico} onChange={handleChange} />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Asesor </label>
                        <input
                            type="checkbox"
                            name="bd_abog_sorteo_seteo.asesor"
                            checked={nuevoAbogado.bd_abog_sorteo_seteo.asesor}
                                // onChange={(event)=> setNuevoAbogado({...nuevoAbogado.bd_abog_sorteo_seteo, asesor: event.target.checked})}
                                onChange={(event) => setNuevoAbogado(prevState => ({
                                    ...prevState,
                                    bd_abog_sorteo_seteo: {
                                        ...prevState.bd_abog_sorteo_seteo,
                                        asesor: event.target.checked
                                    }
                                }))}
                        />
                    </div>
                    <div>
                        <label>Defensor </label>
                        <input
                            type="checkbox"
                            name="bd_abog_sorteo_seteo.defensor"
                            checked={nuevoAbogado.bd_abog_sorteo_seteo.defensor}
                            // permite que el check se pueda visualizar correctamente (aparece o desaparece)    
                                // onChange={(event)=> setNuevoAbogado({...nuevoAbogado, bd_abog_sorteo_seteo:{defensor: event.target.checked}})}
                                //onChange={(event)=> setNuevoAbogado({...nuevoAbogado.bd_abog_sorteo_seteo, defensor: event.target.checked})}
                            onChange={(event) => setNuevoAbogado(prevState => ({
                                ...prevState,
                                bd_abog_sorteo_seteo: {
                                    ...prevState.bd_abog_sorteo_seteo,
                                    defensor: event.target.checked
                                }
                            }))}                            
                        />
                    </div>    
                </section>             
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Constituido: </label>
                        <input className='anchoGrandisimo espaciado' name='bd_abog_domicilio.constituido' value={nuevoAbogado.bd_abog_domicilio.constituido} onChange={handleChange} />
                    </div>     
                </section>    
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Zona de Sorteo: </label>
                        <select value={nuevoAbogado.bd_abog_sorteo_seteo.zona_sorteo} name='bd_abog_sorteo_seteo.zona_sorteo' onChange={handleChange} >
                            <option value=''>Seleccione una zona de sorteo</option>
                            <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                            <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                            <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                        </select>
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Horario de Atención: </label>
                        <input className='anchoGrandisimo' name='bd_abog_horario_atencion' value={nuevoAbogado.bd_abog_horario_atencion} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Usuario M.E.V.: </label>
                        <input className='anchoMediano' name='bd_abog_usuario_mev' value={nuevoAbogado.bd_abog_usuario_mev} onChange={handleChange} />
                    </div>
                </section>
                <section className='botones'>
                    <button type='submit'>Agregar</button>
                    <button onClick={() => limpiarInputs()}>Borrar Datos</button>
                    <button onClick={()=>handlerVolverClick()}>Volver</button>
                </section>
                

                {/* llamoAunaFuncio */}
                {/* <button onClick={limpiarInputs}>Cancelar</button> */}

            </form>
            {/* muestra los mensajes de error */}
            {mensajeParaMostrar && <p>{mensajeParaMostrar}</p>}
            {errorParaMostrar && presionoCancelar === false && <div className='tablaUnicoTextoCentrado'>{errorParaMostrar}</div>}
        </div>
    );
}

export default FormAbogAlta;