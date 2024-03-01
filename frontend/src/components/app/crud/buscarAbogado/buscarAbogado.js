import React, { useState } from 'react';
import './buscarAbogado.css';

const BuscarAbogado = (props) => {


    const [buscarCuitNombre, setBuscarCuitNombre] = useState('');
    const [buscarTexto, setBuscarTexto] = useState('');
    const handlerBuscarOption = (event) => {
        setBuscarCuitNombre(event.target.value);
    }
    const handlerTexto = (event) => {
        setBuscarTexto(event.target.value);
    }
    return (
        <>
            <section className='caja-busqueda-container'>
                <h2>Busqueda de un abogado llamada desde {props.llamado}</h2>
                <select id='buscarCuitNombre' value={buscarCuitNombre} onChange={handlerBuscarOption}>
                    <option value={''}>Seleccionar....</option>
                    <option value={'CUIT'}>CUIT</option>
                    <option value={'Nombre'}>Nombre</option>
                </select>
                <input id='buscar' value={buscarTexto} onChange={handlerTexto}/>
                <button>Buscar</button>
                {props.llamado === 'createAbogado' && (<h1>llamado desde create</h1>)}
                {props.llamado === 'updateAbogado' && (<h1>llamado desde update</h1>)}
                {props.llamado === 'queryAbogado' && (<h1>llamado desde query</h1>)}
                {props.llamado === 'deleteAbogado' && (<h1>llamado desde delete</h1>)}
                
            </section>
        
        </>
        

        
    //        const handlerZonaOpcionChange = (event) => {
    //     setOpcionZonaParaAgregar(event.target.value);
    // }

        // <article className='zona'>
        //                     <label htmlFor='zona'>Zona: </label>
        //                     <select id='zona' value={opcionZonaParaAgregar} onChange={handlerZonaOpcionChange}>
        //                         <option value={''}>Seleccionar...</option>
        //                         <option value={'norte'}>Zona Norte del Partido de La Costa</option>
        //                         <option value={'centro'}>Zona Centro del Partido de La Costa</option>
        //                         <option value={'sur'}>Zona Sur del Partido de La Costa</option>
        //                     </select>

        //                 </article>
        
        
    );
}

export default BuscarAbogado;
