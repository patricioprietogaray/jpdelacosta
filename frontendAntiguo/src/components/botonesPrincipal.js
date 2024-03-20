import React, { useState } from 'react';
import BuscarLetrado from './buscarLetrado';
// import './css/botonesPrincipales.css';

const BotonesPrincipal = () => {
    const [botonPresionado, setBotonPresionado] = useState('');
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

    const asignarBotonPresionado = (boton) => {
        setBotonPresionado(boton);
        setMostrarBusqueda(true);
        console.log(botonPresionado);
    }

    return (
        <div className='contenedorBotones'>
                <section className='basededatos'>
                    <h3>Base de datos</h3>
                    <button onClick={()=>asignarBotonPresionado('letrado')}>Letrados</button>
                    <button onClick={()=>asignarBotonPresionado('psicologo')}>Psicólogos</button>
                    <button onClick={()=>asignarBotonPresionado('trabajadorSocial')}>Trabajadores Sociales</button>
                    <button onClick={()=>asignarBotonPresionado('martillero')}>Martilleros</button>
                </section>
                <section className='sorteos'>
                    <h3>Sorteos</h3>
                    <button onClick={()=>asignarBotonPresionado('expediente')}>Número de expediente</button>
                    <button onClick={()=>asignarBotonPresionado('nombreAbogado')}>Nombre de abogado</button>
                    <button onClick={()=>asignarBotonPresionado('fecha')}>Fecha del sorteo</button>
                    <button onClick={()=>asignarBotonPresionado('reporte')}>Reporte de sorteos</button>
                </section>
                {
                    mostrarBusqueda===true && botonPresionado==='letrado' && (
                        <BuscarLetrado lobuscado={botonPresionado} /> 
                )}
        </div>
    );
}

export default BotonesPrincipal;
