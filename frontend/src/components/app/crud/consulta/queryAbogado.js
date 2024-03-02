import React from 'react';
import './queryAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const QueryAbogado = ({baseDatos}) => {
    return (
        <>
            <section className='query-container'>
                <BuscarAbogado key={baseDatos.bd_abog_cuit} baseDatos={baseDatos} llamado='queryAbogado' />
            </section>
        </>
    );
}

export default QueryAbogado;
