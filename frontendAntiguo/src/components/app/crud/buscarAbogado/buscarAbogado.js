// componente buscarAbogado.js

import React, { useState, useEffect } from 'react';
import CajaDeTextoCreate from './cajaDeTextoCreate';
import axios from 'axios';

const BuscarAbogado = ({llamado}) => {
    
    // manejador de la bd
    const puertoNode = process.env.REACT_APP_NODE_PORT || 3001;
    const [abogadosBD, setAbogadosBD] = useState([]);
    const [mensajeError, setMensajeError] = useState('');
    
    //cargar desde select-option -
    const [opcionBusqueda, setOpcionBusqueda] = useState('');
    //caja de texto de busqueda
    const [textoBusqueda, setTextoBusqueda] = useState('');
    //mostrar un mensaje cuando busque
    const [mensajeAlBuscar, setMensajeAlBuscar] = useState('Sin un mensaje');
    //mostrar el resultado de la busqueda
    const [resultado, setResultado] = useState([]);
    //mostrar el componente mostrarCajaTextoCreate
    const [mostrarCajaTextoCreate, setMostrarCajaTextoCreate] = useState(false);
    //funciones
    //cargar la opcion
    const cambiosOpcionBusqueda = (event) => {
        setOpcionBusqueda(event.target.value);
    }
    //cargara el dato ingresado en el texto de busqueda
    const cambiosTextoBusqueda = (event) => {
        setTextoBusqueda(event.target.value);
    }
    const buscarElAbogado = (opcionBusqueda, textoBusqueda) => {
        // alert("buscar el abogado: opc de busq: "+opcionBusqueda+ ", texto de busq: "+textoBusqueda);
        if (opcionBusqueda === '' && textoBusqueda === '') {
            setMensajeAlBuscar("No hay nada que mostrar!");
        } else if ((opcionBusqueda === 'bd_abog_cuit' || opcionBusqueda === 'bd_abog_nombre') && textoBusqueda === '') {
                setMensajeAlBuscar("El texto está vacío!");
        } else if (opcionBusqueda === 'bd_abog_nombre' && textoBusqueda !== '') {
            setMensajeAlBuscar("buscando por nombre.....");
            const { bd_abog_cuit, bd_abog_nombre } = abogadosBD.find(reg => reg.bd_abog_nombre === textoBusqueda);
            console.log(bd_abog_cuit);
            console.log(bd_abog_nombre);
        } else if (opcionBusqueda === 'bd_abog_cuit' && Number(textoBusqueda)) {
            setMensajeAlBuscar("buscando por cuit.....");
            if (abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda)) !== undefined) {
                const { bd_abog_cuit } = abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda));
                setResultado(`Ha encontrado a ${bd_abog_cuit} en la lista!`);
            } else {
                setResultado("El CUIT no se encuentra en la base de datos!");
                // mostrar caja de texto
                console.log("llama a CajaDeTextoCreate");
                // <CajaDeTextoCreate baseDatos={baseDatos} llamado={llamado} />
                // por que no lo llama????? porque tiene que llamarse desde un estado
                setMostrarCajaTextoCreate(true);
            }
        }
    }

    // useEffect para la carga de la base de datos de abogados
    // USEEFECT DEFE ESTAR AFUERA DE CUALQUIER FUNCION!!!!!
    useEffect(() => {
        const cargarBDabogados = async () => {
            try {
                const servidorBD = `http://localhost:${puertoNode}/abogados/`;
                const respuestaObtencionColeccion = await axios.get(servidorBD);
                setAbogadosBD(respuestaObtencionColeccion.data.abogados_collections);
            } catch (error) {
                setMensajeError(error.message);
                alert("error: " + mensajeError);
            }
        };

        cargarBDabogados();
    }, []); // Agregamos un array vacío como segundo argumento para que useEffect se ejecute solo una vez al montar el componente

    useEffect(() => {
        console.log("abogados desde buscar abogado: ", abogadosBD);
    }, [abogadosBD]); // Este useEffect se ejecutará cada vez que abogadosBD cambie


    return (
        <div>
            <label>Seleccione una opción: </label>
            <select id='buscarCuitNombre' value={opcionBusqueda} onChange={cambiosOpcionBusqueda}>
                <option value={''}>Seleccionar ...</option>
                <option value={'bd_abog_cuit'}>Buscar por CUIT</option>
                <option value={'bd_abog_nombre'}>Buscar por Nombre</option>
            </select>
            <input id='cajaTextoBusqueda' value={textoBusqueda} onChange={cambiosTextoBusqueda} />
            <button onClick={() => buscarElAbogado(opcionBusqueda, textoBusqueda)}>Encontrar al abogado segun {opcionBusqueda === 'bd_abog_cuit' ? 'cuit' : 'nombre'}</button>
            <br></br>
            {mensajeAlBuscar}<br/>
            {/* {resultado && (`El cuit ${resultado.bd_abog_cuit} coincide con ${resultado.bd_abog_nombre}`)} */}
            {resultado ? <p>{resultado}</p> : <p>Error: No hay registros que mostrar!</p>}
            {/* <p>Ha encontrado a {resultado} en la lista!</p> */}
            {mostrarCajaTextoCreate && (<CajaDeTextoCreate />)}
        </div>
    );
}

export default BuscarAbogado;
