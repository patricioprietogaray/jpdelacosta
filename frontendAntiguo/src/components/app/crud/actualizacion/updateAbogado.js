import React from 'react';
import './updateAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const UpdateAbogado = ({baseDatos}) => {
    return (
        <>
            <section className='update-container'>
                <BuscarAbogado key={baseDatos.bd_abog_cuit} baseDatos={baseDatos} llamado='updateAbogado' />
            </section>
        </>
    );
}

export default UpdateAbogado;
