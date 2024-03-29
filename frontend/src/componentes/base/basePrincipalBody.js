import React, { useState } from 'react';
import '../css/PrincipalCuerpo.css';
import BaseAbogado from './baseAbogado';

const BasePrincipalBody = () => {
    //llamado a los ditintos componentes
    const [buscarAbogado, setBuscarAbogado] = useState(null);
    const [buscarPsicologo, setBuscarPsicologo] = useState(null);
    const [buscarTrabajadorSocial, setBuscarTrabajadorSocial] = useState(null);
    const [buscarMartilleroTasador, setBuscarMartilleroTasador] = useState(null);
    const [sorteos, setSorteos] = useState(null);


    const handleChange = (event) => {
        const opcionSeleccionada = event.target.value;
        switch (opcionSeleccionada) {
            case 'Abogados':
                setBuscarAbogado(true);
                setBuscarPsicologo(false);
                setBuscarTrabajadorSocial(false);
                setBuscarMartilleroTasador(false);
                setSorteos(false);
                break;
            case 'Psicologos':
                setBuscarAbogado(false);
                setBuscarPsicologo(true);
                setBuscarTrabajadorSocial(false);
                setBuscarMartilleroTasador(false);
                setSorteos(false);
                break;
            case 'TrabajadoresSociales':
                setBuscarAbogado(false);
                setBuscarPsicologo(false);
                setBuscarTrabajadorSocial(true);
                setBuscarMartilleroTasador(false);
                setSorteos(false);
                break;
            case 'MartillerosTasadores':
                setBuscarAbogado(false);
                setBuscarPsicologo(false);
                setBuscarTrabajadorSocial(false);
                setBuscarMartilleroTasador(true);
                setSorteos(false);
                break;
            case 'Sorteos':
                setBuscarAbogado(false);
                setBuscarPsicologo(false);
                setBuscarTrabajadorSocial(false);
                setBuscarMartilleroTasador(false);
                setSorteos(true);
                break;
            default:
                setBuscarAbogado(false);
                setBuscarPsicologo(false);
                setBuscarTrabajadorSocial(false);
                setBuscarMartilleroTasador(false);
                setSorteos(false);
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
                <option value='MartillerosTasadores'>Martilleros Tasadores</option>
                <option value='Sorteos'>Sorteo</option>
            </select>
            <div>
                {buscarAbogado && (
                    <BaseAbogado />
                )}
            </div>
            
            {buscarPsicologo && (
                <p>Buscar psicólogo!</p>
                // <BasePsicologo />
            )}
            {buscarTrabajadorSocial && (
                <div>busco los trabajadores sociales</div>
            )}
            {buscarMartilleroTasador && (
                <div>busco los martilleros y tasadores</div>
            )}
            {sorteos && (
                <div>busco los sorteos</div>
            )}
        </div>
    );
}

export default BasePrincipalBody;
