import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabla from './tabla';

const Formulario = () => {

    const [atributo, setAtributo] = useState('');
    const [textoBusqueda, setTextoBusqueda] = useState('');

    //activar y desactivar el input
    const [inputDesactivado, setInputDesactivado] = useState(true);

    //base de datos
    // si devuelve un resultado no importa el contenido
    const [resultadoBooleano, setResultadoBooleano] = useState(false);
    const [resultadoFiltroBooleano, setResultadoFiltroBooleano] = useState(false);
    const [abogadosBDTodos, setAbogadosDBTodos] = useState([]);
    const [abogadosBDFitro, setAbogadosBDFiltro] = useState([]);
    const [mensajeError, setMensajeError] = useState('');
        
    const handleChange = (event) => {
        setAtributo(event.target.value);
        (event.target.value !== '') ? setInputDesactivado(false) : setInputDesactivado(true);
    }

    const textoAbuscar = (event) => {
        setTextoBusqueda(event.target.value);
        busqueda(event);
    }

    const busqueda = (e) => {
        //para que el form no se actualice
        e.preventDefault();
        if (atributo === 'bd_abog_cuit' && textoBusqueda !== '') {
            const filtro = abogadosBDTodos.filter(elem => {
                let cuitStr = String(elem.bd_abog_cuit);
                let textoStr = textoBusqueda.toString();
                return cuitStr.includes(textoStr);                    
            })
            setAbogadosBDFiltro(filtro);
            setResultadoFiltroBooleano(true);
        } else if (atributo === 'bd_abog_nombre' && textoBusqueda !== '') {
            const filtro = abogadosBDTodos.filter(elem => {
                let nombStr = String(elem.bd_abog_nombre).toUpperCase();
                let textoStr = textoBusqueda.toString().toUpperCase();
                return nombStr.includes(textoStr);                    
            })
            setAbogadosBDFiltro(filtro);
            setResultadoFiltroBooleano(true);

            /// ojo sencible a may y min
        } else {
            setResultadoBooleano(true);
            setResultadoFiltroBooleano(false);
        }

    }    

    useEffect(() => {
        
        const obternerTodosAbogados = async () => {
            try {
                const respuestaTodosAbogados = await axios.get(
                    `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados`
                );
                setAbogadosDBTodos(respuestaTodosAbogados.data.abogados_collections);
                if (abogadosBDTodos !== null) {
                    setResultadoBooleano(true);
                } else {
                    setResultadoBooleano(false);
                }
            } catch (error) {
                setMensajeError('La conexion fue rechazada: ' + error);
            }
        };
        obternerTodosAbogados();
    },[]);

    return (
        <>
            <form onSubmit={busqueda}>
                <label>Buscar por .... </label>
                <select onChange={handleChange}>
                    <option value=''>Buscar por ....</option>
                    <option value='bd_abog_cuit'>CUIT</option>
                    <option value='bd_abog_nombre'>NOMBRE</option>
                </select>
                <label>Ingrese dato (completo o parcial) ....  </label>
                <input onChange={textoAbuscar} disabled={inputDesactivado} />
                <button type='submit' disabled={inputDesactivado}>Buscar</button>
                {/* <button className='agregarRegistro'>Agregar un nuevo registro</button> */}
            </form>
             {resultadoBooleano === false && (<div>{abogadosBDTodos}-{mensajeError}</div>)}
             {resultadoBooleano === true && resultadoFiltroBooleano === false && (
                <Tabla coleccion={abogadosBDTodos} />
            )}
            {resultadoBooleano === true && resultadoFiltroBooleano === true && (
                <Tabla coleccion={abogadosBDFitro} />
            )}
            {/* {abogadosBDTodos ? <div>Todos los abogados: hay {abogadosBDTodos.length} elementos</div> : <div>sin elementos: {abogadosBDTodos}</div>}
            {abogadosBDFitro ? <div>Filtro los abogados: hay {abogadosBDFitro.length} elementos</div> : <div>sin elementos: {abogadosBDFitro}</div>} */}
        </>
        
    );
}

export default Formulario;
