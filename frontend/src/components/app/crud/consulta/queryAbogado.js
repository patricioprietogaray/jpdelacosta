import React from 'react';
import './queryAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const QueryAbogado = (props) => {
    return (
        <>
            <section className='query-container'>
                <h1>Query</h1>
                <h1>Modulo de consultas</h1>
                <BuscarAbogado llamado='queryAbogado'  />
            </section>
        </>
    );
}

export default QueryAbogado;
