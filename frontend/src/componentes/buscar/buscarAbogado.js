//buscarAbogado.js


import React, { useEffect, useState } from 'react';
import TablaAbogGeneral from '../tabla/tablaAbogGeneral';

const BuscarAbogado = () => {
    // buscar por ....
    const [atributo, setAtributo] = useState('');
    const [textoBusqueda, setTextoBusqueda] = useState('');

    // activar y desactivar el input
    const [estaInputDesactivado, setEstaInputDesactivado] = useState(true);

    const handleChange = (event) => {
        setAtributo(event.target.value);
        atributo !== '' ? setEstaInputDesactivado(true) : setEstaInputDesactivado(false);
    }

    const modificaTextaBusqueda = (event) => {
        setTextoBusqueda(event.target.value);
    }

    // Utiliza useEffect para observar cambios en el estado 'atributo'
    // y que se comporte de manera inmediata al cambio
    // sin useeffect muestra el resultado "atrasado"
    useEffect(() => {
        if (atributo !== '') {
            setEstaInputDesactivado(false);
        } else {
            setEstaInputDesactivado(true);
        }
    }, [atributo]); // Este efecto se ejecutará cada vez que 'atributo' cambie

    //si hay datos para buscar muestro la tabla
    // const [mostrarTablaGeneral, setMostrarTablaGeneral] = useState(false);

    // useEffect(() => {
    //     if (atributo !== '' && textoBusqueda !== '') {
    //         setMostrarTablaGeneral(true);
    //     } else {
    //         setMostrarTablaGeneral(false);
    //     }
    // },[textoBusqueda]);


    return (
        <div>
            <form>
                <label>Buscar por .... </label>
                <select onChange={handleChange}>
                    <option value=''>Buscar por ....</option>
                    <option value='bd_abog_cuit'>C.U.I.T.</option>
                    <option value='bd_abog_nombre'>NOMBRE</option>
                    <option value='bd_abog_zona'>ZONA</option>
                </select>
                <input onChange={modificaTextaBusqueda} disabled={estaInputDesactivado} />
            </form>
            {/* {mostrarTablaGeneral && <TablaAbogGeneral atributo={atributo} textoBusqueda={textoBusqueda} />} */}
            {`Envia a la tabla general el atributo ${atributo}, con el texto ${textoBusqueda}`}
            <TablaAbogGeneral atributo={atributo} textoBusqueda={textoBusqueda} />

        </div>
    );
}

export default BuscarAbogado;
