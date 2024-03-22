// altaRegistro.js

import { useState } from "react";
import axios from 'axios';

//importo los atributos de LAS VALIDACIONES DEL SERVIDOR!   /utils/validations-atributos.js
// import {
//         bdAbogCUIT, bdAbogNombre, bdAbogTomo, bdAbogFolio,
//         bdAbogAsesor, bdAbogDefensor, bdAbogDomicilioElectronico,
//         bdAbogCorreoElectrónico, bdAbogHorarioAtencion, bdAbogDomicilioReal,
//         bdAbogCelular, bdAbogTelefono, bdAbogZona, bdAbogDomicilioLegal, bdAbogUsuarioMev
//     } from '../../validaciones/validations-atributos';

// import { bdAbogCUIT } from "../../../../../../../backend/utils/validations-atributos";

const AltaRegistro = ({ cerrarVentana }) => {
    //estados en blanco para agregar el dato a la bd
    const [nombre, setNombre] = useState('');
    const [cuit, setCuit] = useState('');
    const [tomo, setTomo] = useState('');
    const [folio, setFolio] = useState('');
    const [domReal, setDomReal] = useState('');
    const [teleFijo, setTeleFijo] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [domElec, setDomElec] = useState('');
    const [asesor, setAsesor] = useState(false);
    const [defensor, setDefensor] = useState(false);
    const [domLeg, setDomLeg] = useState('');
    const [zona, setZona] = useState('');
    const [horario, setHorario] = useState('');
    const [mev, setMev] = useState('');

    //mensajes del servidor
    const [mostrarMensajeServer, setMostrarMensajeServer] = useState('');
    const [mostrarErrorServer, setMostrarErrorServer] = useState('');
    
    
    // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
    const handlerVolverClick = () => {
        cerrarVentana();
    }

    const handlerNombreChange = (event) => {
        setNombre(event.target.value);
    }

    const handlerTomoChange = (event) => {
        setTomo(event.target.value);
    }

    const handlerFolioChange = (event) => {
        setFolio(event.target.value);
    }

    const handlerCuitChange = (event) => {
        setCuit(event.target.value);
    }

    const handlerDomRealChange = (event) => {
        setDomReal(event.target.value);
    }

    const handlerTeleFijoChange = (event) => {
        setTeleFijo(event.target.value);
    }

    const handlerCelularChange = (event) => {
        setCelular(event.target.value);
    }

    const handlerEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlerDomElecChange = (event) => {
        setDomElec(event.target.value);
    }

    const handlerAsesorChange = (event) => {
        setAsesor(event.target.value);
    }

    const handlerDefensorChange = (event) => {
        setDefensor(event.target.value);
    }

    const handlerDomLegalChange = (event) => {
        setDomLeg(event.target.value);
    }

    const handlerZonaChange = (event) => {
        setZona(event.target.value);
    }

    const handlerHorarioChange = (event) => {
        setHorario(event.target.value);
    }

    const handlerMEVChange = (event) => {
        setMev(event.target.value);
    }

    const agregarRegistro = async (event) => {
        event.preventDefault(); 

        try {
            const respuestaCarga = await axios.post(`http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados`, {
                // bd_abog_cuit: Number(cuit),
                // bd_abog_nombre: nombre,
                // bd_abog_tomo: Number(tomo),
                // bd_abog_folio: Number(folio),
                // bd_abog_asesor: Boolean(asesor),
                // bd_abog_defensor: Boolean(defensor),
                // bd_abog_domicilio_electronico: domElec,
                // bd_abog_email: email,
                // bd_abog_horario_atencion: horario,
                // bd_abog_domicilio_real: domReal,
                // bd_abog_celular: celular,
                // bd_abog_telefono_fijo: teleFijo,
                // bd_abog_zona: zona,
                // bd_abog_domicilio_legal: domLeg,
                // bd_abog_usuario_mev: mev

                bd_abog_nombre: nombre
            });
            setMostrarMensajeServer(respuestaCarga.data.msg);
            setMostrarErrorServer('');
        } catch (error) {
            setMostrarMensajeServer('');
            setMostrarErrorServer('Error en la carga del abogado: ' + error.message);
            // if (error.response && error.response.data && error.response.data.errors) {
            //     // Si hay errores de validación en la respuesta del servidor, muestra los mensajes
            //     const validationErrors = error.response.data.errors.map(error => error.msg).join(", ");
            //     setMostrarErrorServer(`Errores de validación: ${validationErrors}`);
            // }
        }
    }

    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <h4>Agregar un abogado</h4>
                <div className='close-button' onClick={handlerVolverClick}></div>
            </section>
            <form onSubmit={agregarRegistro}>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Nombres y Apellidos: </label>
                        <input className='anchoGrande espaciado' onChange={handlerNombreChange} />
                    </div>
                    <div>
                        <label>Tomo: </label>
                        <input className='anchoChico textoDerecha espaciado' onChange={handlerTomoChange} />
                    </div>
                    <div>
                        <label>Folio: </label>
                        <input className='anchoChico textoDerecha espaciado' onChange={handlerFolioChange} />
                    </div>
                    <div>
                        <label>C.U.I.T.: </label>
                        <input className='anchoMediano espaciado' onChange={handlerCuitChange} />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domicilio Real: </label>
                        <input className='anchoGrandisimo espaciado' onChange={handlerDomRealChange} />
                    </div>
                    <div>
                        <label>Teléfono Fijo: </label>
                        <input className='anchoMediano espaciado' onChange={handlerTeleFijoChange} />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Celular: </label>
                        <input className='anchoMediano espaciado' onChange={handlerCelularChange} />
                    </div>
                    <div>
                        <label>E - Mail: </label>
                        <input className='anchoGrande espaciado' onChange={handlerEmailChange} />
                    </div>
                </section>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Domiclio Electrónico: </label>
                        <input className='anchoGrande espaciado' onChange={handlerDomElecChange} />
                    </div>
                    <div>
                        <label>Asesor: </label>
                        <select className='anchoChicoOpcion espaciado' onChange={handlerAsesorChange} >
                            <option value='true'>SI</option>
                            <option value='false'>NO</option>
                        </select>
                    </div> 
                    <div>
                        <label>Defensor: </label>
                        <select className='anchoChicoOpcion espaciado' onChange={handlerDefensorChange} >
                            <option value='true'>SI</option>
                            <option value='false'>NO</option>
                        </select>
                    </div> 
                </section>            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal: </label>
                    <input className='anchoGrandisimo espaciado' onChange={handlerDomLegalChange} />
                </div>
                <div>
                    <label>Zona de Sorteo: </label>
                    <select onChange={handlerZonaChange} >
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Horario de Atención: </label>
                    <input className='anchoGrandisimo' onChange={handlerHorarioChange} />
                </div>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input className='anchoMediano' onChange={handlerMEVChange} />
                </div>
                </section>
                <button type="submit">Guardar</button>
            </form>
            
            {mostrarMensajeServer && <p>{mostrarMensajeServer}</p>}
            {mostrarErrorServer && <p>{mostrarErrorServer}</p>}
        </div>
        
     




    );
}

export default AltaRegistro;

