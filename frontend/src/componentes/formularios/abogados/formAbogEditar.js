// formAbogEditar.js     actualizar registro

import React, { useEffect, useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogEditar = ({ registro, cerrarVentanaEditar }) => {

    const host = "192.168.18.100";
   

    //*************************************************************************** */
    //** LLamado a la funcion cerrar desde el componente consultas */
    // ventana volver desde editar
    const handlerVolverClickConsulta = () => {
        cerrarVentanaEditar();
    }
    //llamo a la funcion cerrar del componente anterior que muestra el componete actual
    // sin codigo por tratarse de la primera llamada a los componentes hijos

    //************************************************************************** */
    //defino a la funcion cerrar del componente actual que mostrará el componente que llamo desde aqui
    //codigo de cierre del componente hijo
    // no se puede cerrar un componente cuando estoy en el debo enviar la orden de cierre
    // desde el lugar que es llamado es por eso qe paso como parametro la funcion de cierre
    //NO HAY COMPONENTES HIJOS

    
    //datos
    const [datos, setDatos] = useState({});

    //actualizar datos -> useEffect
    //escucha los cambios en el registro
    //la primera vez en la carga

    useEffect(() => {
        // Atenti: el registro[0] debe existir antes de establecer datos
        if (registro && registro.length > 0) {
            setDatos(registro[0]);
        }
    },[registro]);
    

    //manejo cambios en inputs 
    const inputEditado = (e) => {
        const { name, type, checked, value } = e.target;
        // Si es un checkbox, actualiza el estado según si está marcado o no    
        // if (type === 'checkbox') {
        //setDatos({ ...datos, [name]: checked });
        if (!name.includes('.')) {
            // si no esta anidado
            setDatos(prevState => ({
                ...prevState,
                [name]:  type === 'checkbox' ? checked : value
            }));
        } else {
            // si es una propiedad anidada
            const keys = name.split('.');
            setDatos(prevState => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: type === 'checkbox' ? checked : value
                }
            }));
        }

         
        // if (checked) {
        //     alert(`Checkbox ${name} marcado`);
        // } else {
        //     alert(`Checkbox ${name} desmarcado`);
        // }
        // } else {
        // Para otros tipos de inputs, actualiza el estado según el valor ingresado
        // setDatos({ ...datos, [name]: value });
        // }
    };



    //guardar los datos en el servidor
    const handlerGuardarModificacion = async() => {
        // {registro.bd_abog_cuit} es el dato original que llega y no esta editado de ninguna manera
        // por este componente
        // alert('datos: ' + datos.bd_abog_nombre);
        // alert('registro: '+registro.bd_abog_nombre);
        try {
            const respuestaModificada = await axios.put(`http://${host}:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/actualizar/${registro[0].bd_abog_cuit}`, datos);
            setDatos(respuestaModificada.data.collectionsAbogados);
        } catch (error) {
            alert('Mensaje de error: ' + error.message);
            //cerrar la ventana actual
            //handlerVolverClick('verVentanaEdicion');
        }
        //cerrar la ventana actual
        handlerVolverClickConsulta();
        cerrarVentanaEditar();  //cerrar la ventana despues de guardar
        // alert('cierro ventana editar.....');
    }

    return (
        <form>
            <section className='barraTitulo'>
                {/* hasta que no guarde no se modifican en el registro */}
                <h4>Editar al abogado: {registro[0].bd_abog_nombre} </h4>
                <div className='close-button' onClick={()=>handlerVolverClickConsulta()}></div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Nombres y Apellidos:</label>
                    <input
                        name='bd_abog_nombre'
                        value={datos.bd_abog_nombre || 'Sin Datos'}
                        className='anchoGrande espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Tomo:</label>
                    <input
                        name='bd_abog_colegio.tomo'
                        value={datos.bd_abog_colegio && (datos.bd_abog_colegio.tomo || 'Sin Datos')}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>Folio:</label>
                    <input
                        name='bd_abog_colegio.folio'
                        value={datos.bd_abog_colegio && (datos.bd_abog_colegio.folio || 'Sin Datos')}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>CUIT:</label>
                    <input
                        name='bd_abog_cuit'
                        value={datos.bd_abog_cuit || 'Sin Datos'}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio electrónico: </label>
                    <input
                        name='bd_abog_contacto.domicilio_electronico'
                        value={datos.bd_abog_contacto && (datos.bd_abog_contacto.domicilio_electronico || 'Sin Datos')}
                        className='anchoGrande espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Teléfono Fijo:</label>
                    <input
                        name='bd_abog_contacto.telefono_fijo'
                        value={datos.bd_abog_contacto && (datos.bd_abog_contacto.telefono_fijo || 'Sin Datos')}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>Celular:</label>
                    <input
                        name='bd_abog_contacto.celular'
                        value={datos.bd_abog_contacto && (datos.bd_abog_contacto.celular || 'Sin Datos')}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>E - Mail:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_contacto.email'
                        value={datos.bd_abog_contacto && (datos.bd_abog_contacto.email || 'Sin Datos')}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Particular: </label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio.particular'
                        value={datos.bd_abog_domicilio && (datos.bd_abog_domicilio.particular || 'Sin Datos')}
                        onChange={inputEditado} />
                </div>
            </section>
            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Legal:</label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio.legal'
                        value={datos.bd_abog_domicilio && (datos.bd_abog_domicilio.legal || 'Sin Datos')}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Constituido:</label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio.constituido'
                        value={datos.bd_abog_domicilio && (datos.bd_abog_domicilio.constituido || 'Sin Datos')}
                        onChange={inputEditado} />
                </div>
            </section>
            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Horario de Atención: </label>
                    <input
                        className='anchoGrandisimo'
                        name='bd_abog_horario_atencion'
                        value={datos.bd_abog_horario_atencion || 'Sin Datos'}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input
                        className='anchoMediano'
                        name='bd_abog_usuario_mev'
                        value={datos.bd_abog_usuario_mev || 'Sin Datos'}
                        onChange={inputEditado} />
                </div>
            </section>

            <button onClick={handlerGuardarModificacion}>Guardar</button>
        </form>
    );
}

export default FormAbogEditar;