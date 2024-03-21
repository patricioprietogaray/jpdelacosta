// altaRegistro.js

import { useState } from "react";
import React from 'react';

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

    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <h4>Agregar un abogado</h4>
                <div className='close-button' onClick={handlerVolverClick}></div>
            </section>
            <form>
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
            </form>
            <button class="botonGuardar">
                <span class="disqueteIcono"></span> Guardar
            </button>
        </div>
        
     




    );
}

export default AltaRegistro;

