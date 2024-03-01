import React from 'react';
import './createAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const CreateAbogado = () => {
    return (
        <>
            <section className='create-container'>
                <h1>create</h1>
                <h1>Modulo de creacion</h1>
                <BuscarAbogado llamado='createAbogado' />
            </section>
        </>
    );
}

export default CreateAbogado;
