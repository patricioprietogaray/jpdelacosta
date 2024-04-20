//formAbogAlta.js

import React, { useState } from 'react';
import '../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogAlta = ({ cerrarVentanaAgregarDesdeGeneral, todosLosDatos }) => {
    
    // al cerrar la ventana envio info al padre para que se cierre solo esta ventana!
    const handlerVolverClick = () => {
        cerrarVentanaAgregarDesdeGeneral();
        // alert("cierro ventana (formAbogAlta)");
    }

    const initialState = {
            bd_abog_cuit: 0,
            bd_abog_nombre: '',
            bd_abog_tomo: 0,
            bd_abog_folio: 0,
            bd_abog_asesor: false,
            bd_abog_defensor: false,
            bd_abog_domicilio_electronico: '',
            bd_abog_email: '',
            bd_abog_horario_atencion:'',
            bd_abog_domicilio_real: '',
            bd_abog_telefono_fijo: '0',
            bd_abog_celular: '0',
            bd_abog_domicilio_legal: '',
            bd_abog_zona: '',
            bd_abog_usuario_mev: ''
        }

    //atributos
    const [nuevoAbogado, setNuevoAbogado] = useState(initialState);
    //errores
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');
    const [presionoCancelar, setPresionoCancelar] = useState(false);

    //al modificar el input (todos)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoAbogado({ ...nuevoAbogado, [name]: value });
        }
    
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
                ...nuevoAbogado,
                bd_abog_asesor: nuevoAbogado.bd_abog_asesor === true ? true : false,
                bd_abog_defensor: nuevoAbogado.bd_abog_defensor === true ? true : false,
            };
            
            const respuestaAlta = await axios.post(
                'http://localhost:3001/abogados/crear', datasEnviados);
                    
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
                        <label>Nombres y Apellidos: </label>
                        <input className='anchoGrande espaciado' name='bd_abog_nombre' value={nuevoAbogado.bd_abog_nombre} onChange={handleChange} />
                    </div>
                <div>
                    <label>Tomo: </label>
                        <input className='anchoChico textoDerecha espaciado' name='bd_abog_tomo' value={nuevoAbogado.bd_abog_tomo} onChange={handleChange} />
                </div>
                <div>
                    <label>Folio: </label>
                    <input className='anchoChico textoDerecha espaciado' name='bd_abog_folio' value={nuevoAbogado.bd_abog_folio} onChange={handleChange} />
                </div>
                <div>
                    <label>C.U.I.T.: </label>
                    <input className='anchoMediano espaciado' name='bd_abog_cuit' value={nuevoAbogado.bd_abog_cuit} onChange={handleChange}  />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Real: </label>
                    <input className='anchoGrandisimo espaciado' name='bd_abog_domicilio_real' value={nuevoAbogado.bd_abog_domicilio_real} onChange={handleChange} />
                </div>
                <div>
                    <label>Teléfono Fijo: </label>
                    <input className='anchoMediano espaciado' name='bd_abog_telefono_fijo' value={nuevoAbogado.bd_abog_telefono_fijo} onChange={handleChange} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Celular: </label>
                    <input className='anchoMediano espaciado' name='bd_abog_celular' value={nuevoAbogado.bd_abog_celular} onChange={handleChange} />
                </div>
                <div>
                    <label>E - Mail: </label>
                    <input className='anchoGrande espaciado' name='bd_abog_email' value={nuevoAbogado.bd_abog_email} onChange={handleChange} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Electrónico: </label>
                    <input className='anchoGrande espaciado' name='bd_abog_domicilio_electronico' value={nuevoAbogado.bd_abog_domicilio_electronico} onChange={handleChange} />
                </div>
                <div>
                    <label>Asesor </label>
                    <input
                        type="checkbox"
                        name="bd_abog_asesor"
                        checked={nuevoAbogado.bd_abog_asesor}
                        onChange={(event)=> setNuevoAbogado({...nuevoAbogado, bd_abog_asesor: event.target.checked})}
                    />
                </div>
                <div>
                    <label>Defensor </label>
                    <input
                        type="checkbox"
                        name="bd_abog_defensor"
                        checked={nuevoAbogado.bd_abog_defensor}
                        // permite que el check se pueda visualizar correctamente (aparece o desaparece)    
                        onChange={(event)=> setNuevoAbogado({...nuevoAbogado, bd_abog_defensor: event.target.checked})}
                    />
                </div>    
            </section>            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal: </label>
                    <input className='anchoGrandisimo espaciado' name='bd_abog_domicilio_legal' value={nuevoAbogado.bd_abog_domicilio_legal} onChange={handleChange} />
                </div>
                <div>
                    <label>Zona de Sorteo: </label>
                    <select value={nuevoAbogado.bd_abog_zona} name='bd_abog_zona' onChange={handleChange} >
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