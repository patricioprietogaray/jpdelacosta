// formAbogEditar.js      leer, actualizar y borrar registro

import React, { useState } from 'react';
import '../../css/PrincipalCuerpo.css';
import FormAbogEditar from './formAbogEditar';
import axios from 'axios';


const FormAbogConsulta = ({ registro, cerrarVentanaConsultaDesdeGeneral, todosLosDatos }) => {
    
    const host = '192.168.18.100';
    
    //cargo todos los atributos del parámetro registro
    // console.log('lo que entra:   ' + registro[0]._id);

    //**** CERRAR VENTANA CONSULTA  */
    //llamo a la funcion cerrar del componente anterior que muestra el componete actual
    // sin codigo por tratarse de la primera llamada a los componentes hijos
    // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
    const handlerVolverClickGeneral = () => {
        cerrarVentanaConsultaDesdeGeneral();
    }
        
    //defino a la funcion cerrar del componente actual que mostrará el componente que llamo desde aqui
    //codigo de cierre del componente hijo
    // no se puede cerrar un componente cuando estoy en el debo enviar la orden de cierre
    // desde el lugar que es llamado es por eso qe paso como parametro la funcion de cierre

    //***** CERRAR VENTANA EDICION */
    const [verVentanaEdicion, setVerVentanaEdicion] = useState(false);
    //defino la funcion cerrar para la ventana edicion
    const cerrarComponenteEditar = () => {
        setVerVentanaEdicion(false);
    }

    //defino la funcion que al presionar el boton editar muestro la ventana edicion
    //llamar al componente editar y sin cerrar esta ventana
    const handlerEditar = () => {
        setVerVentanaEdicion(true);
    }

    const [cargoRegistros, setCargoRegistros] = useState({ ...registro[0] });


    // console.log(cargoRegistros.nombre);
    //botones
    const [botonEditar, setBotonEditar] = useState(true);
    const [botonBorrar, setBotonBorrar] = useState(true);
    const [botonVolver, setBotonVolver] = useState(false);


    // color de la ventana
    const [estiloVentana, setEstiloVentana] = useState('ventanaEmergenteConsulta');

    const handlerVolver = () => {
        cerrarVentanaConsultaDesdeGeneral();
    }


    

    //ventanas
    
    //const [verVentanaBorrar, setVerVentanaBorrar] = useState(false);

    //mensajes desde el servidor
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');

    //atributos inputs
    //const [isReadOnly, setIsReadOnly] = useState(true);
    //const [isDisabled, setIsDisabled] = useState(true);

    

  

    //llamar al componente borrar y sin cerrar esta ventana
    const handlerBorrar = () => {
        setBotonEditar(false);
        setBotonBorrar(true);
        setBotonVolver(true);
        // alert("presiono el boton borrar!");
        setEstiloVentana('ventanaEmergenteBorrar');
        if (botonBorrar === true && estiloVentana === 'ventanaEmergenteConsulta') {
            alert('presiono el boton borrar para mostrar el registro se borrará');
        }
        if (botonBorrar === true && estiloVentana === 'ventanaEmergenteBorrar') {
            handlerBorrarDefinitivamente();
            handlerVolver();
        }
        
    }
    

    const handlerBorrarDefinitivamente = async () => {
        // alert('presiono el boton borrar para borrar el registro: '+registro[0]._id + ', cuit: '+registro[0].bd_abog_cuit);
        try {
            const response = await axios.delete(`http://${host}:3001/abogados/borrar/${registro[0].bd_abog_cuit}`);
            // alert(response.data.msg);
            setMensajeParaMostrar(response.data.msg);
            setErrorParaMostrar('');
            //actualizo los datos de la tabla en AbogGeneral
            todosLosDatos();
            handlerVolverClickGeneral();
        } catch (error) {
            setMensajeParaMostrar('');
            setErrorParaMostrar('Error al borrar el abogado: ' + error.message);
        }
    }
    //************************************************************************** */


    return (
        // <div className='ventanaEmergenteConsulta'>
        <div className={estiloVentana}>

        <section className='barraTitulo'>
                {estiloVentana==='ventanaEmergenteConsulta'?<h4>Consulta del abogado: {registro[0].bd_abog_nombre}</h4>:<h4>Eliminar el abogado: {registro[0].bd_abog_nombre}</h4>}
                {/* <h4>{(estiloVentana === 'ventanaEmergenteConsulta' ? 'consulta' : 'borrar')} - Consulta del abogado: {registro[0].bd_abog_nombre} </h4> */}
                <div className='close-button' onClick={()=>handlerVolverClickGeneral()}></div>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Nombres y Apellidos: <span>{cargoRegistros.bd_abog_nombre}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Tomo: <span>{cargoRegistros.bd_abog_tomo}</span></label>
                <label>Folio: <span>{cargoRegistros.bd_abog_folio}</span></label>
                <label>C.U.I.T.: <span>{cargoRegistros.bd_abog_cuit}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Domicilio Real: <span>{cargoRegistros.bd_abog_domicilio_real}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Teléfono Fijo: <span>{cargoRegistros.bd_abog_telefono_fijo}</span></label>
                <label>Celular: <span>{cargoRegistros.bd_abog_celular}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>E - Mail:<span>{cargoRegistros.bd_abog_email}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Domiclio Electrónico:<span>{cargoRegistros.bd_abog_domicilio_electronico}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Zona:<span>{cargoRegistros.bd_abog_zona}</span></label>
                <label>Asesor:<span>{cargoRegistros.bd_abog_asesor === true ? 'Si' : 'No'}</span></label>
                <label>Defensor:<span>{cargoRegistros.bd_abog_defensor === true ? 'Si' : 'No'}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Domicilio Legal:<span>{cargoRegistros.bd_abog_domicilio_legal}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Horario de Atención:<span>{cargoRegistros.bd_abog_horario_atencion}</span></label>
            </section>
            <section className='seccionDisplayFlex'>
                <label>Usuario M.E.V.:<span>{cargoRegistros.bd_abog_usuario_mev}</span> </label>
            </section>
            <div className='botonesAccion'>
                {botonEditar && <button onClick={()=>handlerEditar()}>Editar</button>}
                {/* {botonBorrar && <button onClick={handlerBorrar}>Borrar</button>}  */}
                {botonBorrar && <button onClick={() => handlerBorrar()}>Borrar</button>}
                {botonVolver && <button onClick={()=>handlerVolver()}>Volver</button>}
                

            </div>
            
            {verVentanaEdicion &&
                (<div className='ventanaEmergenteEdicion'>
                    <FormAbogEditar registro={registro} cerrarVentanaEditar={cerrarComponenteEditar} />
                </div>
                )
            }
        </div>
    );
}

export default FormAbogConsulta;