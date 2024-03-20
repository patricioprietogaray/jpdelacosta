import React from 'react';
import Buscar from '../../psicologos/buscar/buscar';



const BasePsicologo = () => {
    return (
        <div className='cuerpoPsicologo'>
            <h2>buscar un psicólogo en la base de datos</h2>
            <Buscar />
        </div>
    );
}

export default BasePsicologo;
