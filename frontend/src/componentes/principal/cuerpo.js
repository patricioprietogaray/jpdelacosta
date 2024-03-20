import React, { useState } from 'react';
import '../css/PrincipalCuerpo.css';
import BaseAbogado from './abogados/base/base';
import BasePsicologo from './psicologos/base/base';

const Cuerpo = () => {
    const [buscoAbogado, setBuscoAbogado] = useState(false);
    const [buscoPsicologo, setBuscoPsicologo] = useState(false);
    const [buscoTrabajadorSocial, setBuscoTrabajadorSocial] = useState(false);
    const [buscoSorteo, setBuscoSorteo] = useState(false);

    const handleChange = (event) => {
        const opcionSeleccionada = event.target.value;
        switch (opcionSeleccionada) {
            case 'Abogados':
                setBuscoAbogado(true);
                setBuscoPsicologo(false);
                setBuscoTrabajadorSocial(false);
                setBuscoSorteo(false);
                break;
            case 'Psicologos':
                setBuscoAbogado(false);
                setBuscoPsicologo(true);
                setBuscoTrabajadorSocial(false);
                setBuscoSorteo(false);
                break;
            case 'TrabajadoresSociales':
                setBuscoAbogado(false);
                setBuscoPsicologo(false);
                setBuscoTrabajadorSocial(true);
                setBuscoSorteo(false);
                break;
            case 'Sorteos':
                setBuscoAbogado(false);
                setBuscoPsicologo(false);
                setBuscoTrabajadorSocial(false);
                setBuscoSorteo(true);
                break;
            default:
                setBuscoAbogado(false);
                setBuscoSorteo(false);
                setBuscoTrabajadorSocial(false);
                setBuscoSorteo(false);
                break;
        }
    }

   

    return (
        <div className='contenedorCuerpo'>
            <label>Base de datos: </label>
            <select onChange={handleChange}>
                <option value=''>Seleccione una opción</option>
                <option value='Abogados'>Abogados</option>
                <option value='Psicologos'>Psicólogos</option>
                <option value='TrabajadoresSociales'>Trabajadores sociales</option>
                <option value='Sorteos'>Sorteo</option>
            </select>
            <div>
                {buscoAbogado && (
                    <BaseAbogado />
                )}
            </div>
            
            {buscoPsicologo && (
                <BasePsicologo />
            )}
            {buscoTrabajadorSocial && (
                <div>busco los trabajadores sociales</div>
            )}

            {buscoSorteo && (
                <div>busco los sorteos</div>
            )}
        </div>
    );
}

export default Cuerpo;
