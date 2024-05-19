// formAbogEditar.js     actualizar registro

import React, { useEffect, useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogEditar = ({ registro, cerrarVentanaEditar }) => {

    const host = "192.168.18.100";
    //alert('datos: ' + datos.bd_abog_nombre);
    //alert('registro: ' + registro[0].bd_abog_nombre);
    

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
    const [datos, setDatos] = useState([]);

    //actualizar datos -> useEffect
    //escucha los cambios en el registro
    //la primera vez en la carga

    useEffect(() => {
        setDatos(registro[0])
    },[registro]);
    

    //atributos
    //const [id, setId] = useState(datos._id);

   //edicion de inputs
    // const inputEditado = (e) => {
    //     setDatos({ ...datos, [e.target.name]: e.target.value })
    // }

    //edito inputs y checkbox
    const inputEditado = (e) => {
        const { name, type, checked } = e.target;
        // Si es un checkbox, actualiza el estado según si está marcado o no    
        // if (type === 'checkbox') {
        //setDatos({ ...datos, [name]: checked });
        if (!name.includes('.')) {
            setDatos(prevState => ({
                ...prevState,
                [name]:  type === 'checkbox' ? checked : e.target.value
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
        //cerrarVentanaEditar();
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
                        value={datos.bd_abog_nombre}
                        className='anchoGrande espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Tomo:</label>
                    <input
                        name='bd_abog_colegio.tomo'
                        value={datos.bd_abog_colegio && datos.bd_abog_colegio.tomo}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div> */}
                {/* <div>
                    <label>Folio:</label>
                    <input
                        name='bd_abog_colegio.folio'
                        value={datos.bd_abog_colegio && datos.bd_abog_colegio.folio}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div> */}
                <div>
                    <label>CUIT:</label>
                    <input
                        name='bd_abog_cuit'
                        value={datos.bd_abog_cuit}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Teléfono Fijo:</label>
                    <input
                        name='bd_abog_contacto.telefono_fijo'
                        value={datos.bd_abog_contacto && datos.bd_abog_contacto.telefono_fijo}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div> */}
                {/* <div>
                    <label>Celular:</label>
                    <input
                        name='bd_abog_contacto.celular'
                        value={datos.bd_abog_contacto && datos.bd_abog_contacto.celular}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div> */}
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>E - Mail:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_contacto.email'
                        value={datos.bd_abog_contacto && datos.bd_abog_contacto.email}
                        onChange={inputEditado} />
                </div> */}
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Domiclio Electrónico:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_contacto.domicilio_electronico'
                        value={datos.bd_abog_contacto && datos.bd_abog_contacto.domicilio_electronico}
                        onChange={inputEditado} />
                </div> */}
            </section> 
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Asesor:</label>
                    <input
                        type="checkbox"
                        name="bd_abog_sorteo_seteo.asesor"
                        checked={datos.bd_abog_sorteo_seteo && datos.bd_abog_sorteo_seteo.asesor}
                        onChange={inputEditado}
                    />
                </div> */}
                {/* <div>
                    <label>Defensor:</label>
                    <input
                        type="checkbox"
                        name="datos.bd_abog_sorteo_seteo.defensor"
                        checked={datos.bd_abog_sorteo_seteo && datos.bd_abog_sorteo_seteo.defensor}
                        onChange={inputEditado}
                    />
                </div> */}
                {/* <div>
                    <label>Zona de Sorteo:</label>
                    <select
                        value={datos.bd_abog_zona}
                        name='bd_abog_zona'
                        onChange={inputEditado}
                    >
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div> */}
            </section>
                
            

            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Real: </label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio_real'
                        value={datos.bd_abog_domicilio_real}
                        onChange={inputEditado} />
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Teléfono Fijo: </label>
                    <input
                        className='anchoMediano espaciado'
                        name='bd_abog_telefono_fijo'
                        value={datos.bd_abog_telefono_fijo}
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>Celular:</label>
                    <input
                        className='anchoMediano espaciado'
                        name='bd_abog_celular'
                        value={datos.bd_abog_celular}
                        onChange={inputEditado} />
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>E - Mail:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_email'
                        value={datos.bd_abog_email}
                        onChange={inputEditado} />
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Electrónico:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_domicilio_electronico'
                        value={datos.bd_abog_domicilio_electronico}
                        onChange={inputEditado} />
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Asesor:</label>
                    <input
                        type="checkbox"
                        name="bd_abog_asesor"
                        checked={datos.bd_abog_asesor}
                        onChange={inputEditado}
                    />
                </div>
                <div>
                    <label>Defensor:</label>
                    <input
                        type="checkbox"
                        name="bd_abog_defensor"
                        checked={datos.bd_abog_defensor}
                        onChange={inputEditado}
                    />
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal:</label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio_legal'
                        value={datos.bd_abog_domicilio_legal}
                        onChange={inputEditado}/>
                </div>
            </section> */}
            {/* <section className='seccionDisplayFlex'>
                <div>
                    <label>Zona de Sorteo:</label>
                    <select
                        value={datos.bd_abog_zona}
                        name='bd_abog_zona'
                        onChange={inputEditado}
                    >
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div>
            </section> */}
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Horario de Atención: </label>
                    <input
                        className='anchoGrandisimo'
                        name='bd_abog_horario_atencion'
                        value={datos.bd_abog_horario_atencion}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input
                        className='anchoMediano'
                        name='bd_abog_usuario_mev'
                        value={datos.bd_abog_usuario_mev}
                        onChange={inputEditado} />
                </div>
            </section>

            <button onClick={handlerGuardarModificacion}>Guardar</button>
        </form>
    );
}

export default FormAbogEditar;