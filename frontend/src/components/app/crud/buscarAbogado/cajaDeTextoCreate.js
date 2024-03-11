// componente cajaDeTextoCreate.js

import React, { useState } from 'react';

const CajaDeTextoCreate = () => {

    // estados
    const [nombreParaAgregar, setNombreParaAgregar] = useState('');
    // const [tomoParaAgregar, setTomoParaAgregar] = useState('');
    // const [folioParaAgregar, setFolioParaAgregar] = useState('');
    // const [domicilioRealParaAgregar, setDomicilioRealParaAgregar] = useState('');
    // const [telefonoParaAgregar, setTelefonoParaAgregar] = useState('');
    // const [celularParaAgregar, setCelularParaAgregar] = useState('');
    // const [correoElectronicoParaAgregar, setCorreoElectronicoParaAgregar] = useState('');
    // const [domicilioElectronicoParaAgregar, setDomicilioElectronicoParaAgregar] = useState('');



    //funciones
    const handleNombreChange = (event) => {
        setNombreParaAgregar(event.target.value);
    }

    // const handleTomoChange = (event) => {
    //     setTomoParaAgregar(event.target.value);
    // }

    // const handleFolioChange = (event) => {
    //     setFolioParaAgregar(event.target.value);
    // }

    // const handleDomicilioRealChange = (event) => {
    //     setDomicilioRealParaAgregar(event.target.value);
    // }

    // const handleTelefonoChange = (event) => {
    //     setTelefonoParaAgregar(event.target.value);
    // }

    // const handleCelularChange = (event) => {
    //     setCelularParaAgregar(event.target.value);
    // }

    // const handleCorreoElectronicoChange = (event) => {
    //     setCorreoElectronicoParaAgregar(event.target.value);
    // }

    // const handleDomicilioElectronicoChange = (event) => {
    //     setDomicilioElectronicoParaAgregar(event.target.value);
    // }



    console.log("desde CajaDeTextoCreate:  ....");
    // console.log(baseDatos);
    // console.log(llamado);

    // crear abogado nuevo
    const crearAbogado = ({}) => {
        
    }

    return (
        <form>
            <section>
                <article className='nombre'>
                    <label htmlFor='nombre'>Apellido y Nombre completo: </label>
                    <input id='nombre' value={nombreParaAgregar} onChange={handleNombreChange} />
                </article>
                
                {/* <div className='tomofolio'>
                    <article className='tomo'>
                        <label htmlFor='tomo'>Tomo: </label>
                        <input id='tomo' value={tomoParaAgregar} onChange={handleTomoChange} />
                    </article>
                    <article className='folio'>
                        <label htmlFor='folio'>Folio: </label>
                        <input id='folio' value={folioParaAgregar} onChange={handleFolioChange}/>                    
                    </article>
                </div> */}
                {/* <article className='domicilioreal'>
                    <label htmlFor='domReal'>Domicilio real (calle / av., numero y ciudad): </label>
                    <input id='domReal' value={domicilioRealParaAgregar} onChange={handleDomicilioRealChange} />                    
                </article> */}
                {/* <div className='telefonocelular'>
                    <article className='telefonofijo'>
                        <label htmlFor='telefono'>Telefono fijo: </label>
                        <input id='telefono' value={telefonoParaAgregar} onChange={handleTelefonoChange} />                    
                    </article>
                    <article className='movil'>
                        <label htmlFor='celular'>Celular: </label>
                        <input id='celular' value={celularParaAgregar} onChange={handleCelularChange} />                    
                    </article>
                </div> */}
                {/* <article className='email'>
                    <label htmlFor='email'>Correo Electrónico personal: </label>
                    <input id='email' value={correoElectronicoParaAgregar} onChange={handleCorreoElectronicoChange} />
                </article> */}
                {/* <article className='domicilioelectronico'>
                    <label htmlFor='domElect'>Domicilio Electrónico: </label>
                    <input id='domElect' value={domicilioElectronicoParaAgregar} onChange={handleDomicilioElectronicoChange} />                    
                </article> */}
                {/* <div className='asesordefensor'>
                    <article className='asesor'>
                        <label htmlFor='asesor'>Asesor: </label>
                        <select id='asesor' value={opcionAsesorParaAgregar} onChange={handleAsesorOpcionChange}>
                            <option value={''}>Seleccionar...</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </article>
                    <article className='defensor'>
                        <label htmlFor='defensor'>Defensor: </label>
                        <select id='defensor' value={opcionDefensorParaAgregar} onChange={handleDefensorOpcionChange}>
                            <option value={''}>Seleccionar...</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </article>
                </div> */}
                {/* <article className='domiciliolegal'>
                    <label htmlFor='domLegal'>Domicilio legal (calle / av., numero y ciudad):</label>
                    <input id='domLegal'  value={domicilioLegalParaAgregar} onChange={handleDomicilioLegalChange}/>                    
                </article>
                <article className='horario'>
                    <label htmlFor='horario'>Horario de Atención (dia y hora):</label>
                    <input id='horario' value={horarioAtencionParaAgregar} onChange={handleHorarioAtencionChange} />                    
                </article>
                <article className='zona'>
                    <label htmlFor='zona'>Zona: </label>
                    <select id='zona' value={opcionZonaParaAgregar} onChange={handleZonaOpcionChange}>
                        <option value={''}>Seleccionar...</option>
                        <option value={'norte'}>Zona Norte del Partido de La Costa</option>
                        <option value={'centro'}>Zona Centro del Partido de La Costa</option>
                        <option value={'sur'}>Zona Sur del Partido de La Costa</option>
                    </select>
                </article> */}
                <section>
                    <article className='enviarcancelar'>
                        <button className='enviar' onClick={()=>crearAbogado()}>Agregar el abogado</button>
                        <button className='cancelar' type='reset'>Cancelar la operación</button>
                    </article>
                </section>
            </section>            
        </form>
    );
}

export default CajaDeTextoCreate;
