import React from 'react';
import './updateAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const UpdateAbogado = (props) => {
    return (
        <>
            <section className='update-container'>
                <h1>Update</h1>
                <h1>Modulo de actualizacion</h1>
                <BuscarAbogado llamado='updateAbogado' />
            </section>
        </>
    );
}

export default UpdateAbogado;
