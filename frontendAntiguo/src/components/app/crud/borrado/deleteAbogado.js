import React from 'react';
import './deleteAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const DeleteAbogado = ({baseDatos}) => {
    return (
        <>
            <section className='delete-container'>
                <BuscarAbogado key={baseDatos.bd_abog_cuit} baseDatos={baseDatos} llamado='deleteAbogado' />
            </section>
        </>
    );
}

export default DeleteAbogado;
