import React from 'react';
import './createAbogado.css';
import BuscarAbogado from '../buscarAbogado/buscarAbogado';

const CreateAbogado = () => {
    return (
        <>
            <section className='create-container'>
                {/* <BuscarAbogado key={baseDatos.bd_abog_cuit} baseDatos={baseDatos} llamado='createAbogado' /> */}
                <BuscarAbogado llamado='createAbogado' />
            </section>
        </>
    );
}

export default CreateAbogado;
