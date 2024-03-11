//componente principal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './css/principal.css';
import iconCreate from './images/create.svg';
import iconQuery from './images/query.svg';
import iconUpdate from './images/update.svg';
import iconDelete from './images/delete.svg';
import CreateAbogado from './crud/creacion/createAbogado';
import QueryAbogado from './crud/consulta/queryAbogado';
import UpdateAbogado from './crud/actualizacion/updateAbogado';
import DeleteAbogado from './crud/borrado/deleteAbogado';

const Principal = () => {
    // manejo de los botones
    const [botonmenu, setBotonmenu] = useState('');

    // funcion recibe eventos al cliquear un boton.
    const presiono=(boton)=> {
        setBotonmenu(boton);
    }

   
    return (
        <>
            <section className='menu-principal'> 
                <h2>Agenda de Abogados</h2>
                <button onClick={()=>presiono('create')}><img src={iconCreate} alt="Crear"/>Crear</button>  {/* Agrega una imagen al botón */}
                <button onClick={()=>presiono('query')}><img src={iconQuery} alt="Consultar"/> Consultar</button>
                <button onClick={()=>presiono('update')}><img src={iconUpdate} alt="Actualizar"/> Actualizar</button>
                <button onClick={()=>presiono('delete')}><img src={iconDelete} alt="Borrar"/> Borrar</button>
            </section>
            <section className='contenido-principal'>
                <h1 className='titulo'>Sorteo de abogados</h1>
                <h2 className='subtitulo'>Juzgado de paz letrado de La Costa</h2>
                 
                {/*{botonmenu === 'create' && (<CreateAbogado key={abogadosBD.bd_abog_cuit} baseDatos={abogadosBD} />)}*/}
                {botonmenu === 'create' && (<CreateAbogado />)}
                {/* {botonmenu === 'query' && (<QueryAbogado   key={abogadosBD.bd_abog_cuit} baseDatos={abogadosBD} />)} */}
                {/* {botonmenu === 'update' && (<UpdateAbogado key={abogadosBD.bd_abog_cuit} baseDatos={abogadosBD} />)}  */}
                {/* {botonmenu === 'delete' && (<DeleteAbogado key={abogadosBD.bd_abog_cuit} baseDatos={abogadosBD} />)} */}

            </section>
        </>
    );
}

export default Principal;
