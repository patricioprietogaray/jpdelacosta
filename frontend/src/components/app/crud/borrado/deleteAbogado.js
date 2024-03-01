import React from 'react';
import './deleteAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const DeleteAbogado = () => {
    return (
        <>
            <section className='delete-container'>
                <h1>Delete</h1>
                <h1>Modulo de borrado</h1>
                <BuscarAbogado llamado='deleteAbogado' />
            </section>
        </>
    );
}

export default DeleteAbogado;
