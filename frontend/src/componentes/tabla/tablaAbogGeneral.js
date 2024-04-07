//tablaAbogGeneral.js

import React, { useEffect, useState } from 'react';
import '../css/tabla.css';
import axios from 'axios';
import FormAbogConsulta from '../formularios/formAbogConsulta';
import FormAbogAlta from '../formularios/formAbogAlta';


const TablaAbogGeneral = ({ atributo, textoBusqueda }) => {
    
    //estado para almacenar la coleccion todos o parcial para la tabla
    const [datos, setDatos] = useState([]);

    //estado para almacenar el registro seleccionado
    const [registroSeleccionado, setRegistroSeleccionado] = useState([]);
    
    

    //estado para manejar errores
    const [error, setError] = useState('');

    



    //*************************VENTANAS************************************************** */
    
    //**/ */ VENTANA ACTUAL
    //**** */ declaracion de estados
    //estado para mostrar la ventana de nuevo registro
    const [verNuevoRegistro, setVerNuevoRegistro] = useState(false);

    //estado para ver el registro en la consulta
    const [verRegConsulta, setVerRegConsulta] = useState(false);

    //* COMO ES EL PRIMER COMPONENTE ANIDADO NO HAY FUNCIONES ANTERIORES QUE MANEJAR

    //llamo a la funcion cerrar del componente anterior que muestra el componete actual

    // sin codigo por tratarse de la primera llamada a los componentes hijos

    // no se puede cerrar un componente cuando estoy en el debo enviar la orden de cierre
    // desde el lugar que es llamado es por eso qe paso como parametro la funcion de cierre

    //NO HAY FUNCION DE CERRAR PORQUE ES EL PRIMER COMPONENTE ANIDADO

    //************************************************************************** */
    //**/ */ VENTANA HIJO
    //* MANEJO DE CIERRE DE LA VENTANA NUEVO REGISTRO
    
    const cerrarComponenteAgregar = () => {
        setVerNuevoRegistro(false);
    }

    //* MANEJO DE CIERRE DE LA VENTANA CONSULTA REGISTRO

    const cerrarComponenteConsulta = () => {
        setVerRegConsulta(false);
    }
    //defino a la funcion cerrar del componente actual que mostrará el componente que llamo desde aqui

    //codigo de cierre del componente hijo

    //funcion para cerrar la subventana

    //** FUNCION MANEJO DE BOTONES PARA MOSTRAR EL COMPONENTE HIJO */

    //boton nuevo registro
    const agregarRegNuevo = () => {
        setVerNuevoRegistro(true);
    }



    // const cerrarComponenteConsultaAgregar=(identificarVentana) => {
    //     if (identificarVentana === 'ventanaVerRegistro') {
    //         setVerRegConsulta(false);
    //     }
    //     if (identificarVentana === 'ventanaNuevoRegistro') {
    //         setNuevoRegistro(false);
    //     }
    // }

    //******************************************************* */

    // funcion para obtener todos los datos de la coleccion
    const todosLosDatos = async () => {
        //alert('mostrar todos los datos atributo y textoBusqueda estan vacios');
        let rutaTodos = `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`;
        try {
            const resultadoTodos = await axios.get(rutaTodos);
            // resultado . data . coleccion en mongo
            setDatos(resultadoTodos.data.abogados_collections);
        } catch (error) {
            setError('error de servidor: ' + error.message);
        }
    }

    //funcion que identifica y captura el clic de la linea 
    const tablaClic = async (cuit) => {
        let rutaBuscarCuit = `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/cuit/${cuit}`;
        const todoElRegistro = await axios.get(rutaBuscarCuit);
        setRegistroSeleccionado(todoElRegistro.data.abogados_collections);
        // setRegistroCliqueado(cuit);
        setVerRegConsulta(true);
    }
    //al modificar atributo y textoBusqueda
    useEffect(() => {
        if (atributo === '' || textoBusqueda==='') {
            todosLosDatos();
        }

        todosLosDatos()
    },[atributo, textoBusqueda]);

    return (
        <>
            <p>{error}</p>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>CUIT</th>
                        <th>CELULAR</th>
                        <th>USUARIO MEV</th>
                        <th>ZONA</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.length > 0 && datos.map((dato, index) => (
                        <tr key={index} onClick={()=>tablaClic(dato.bd_abog_cuit)}>
                            <td>{dato.bd_abog_nombre}</td>
                            <td>{dato.bd_abog_cuit}</td>
                            <td>{dato.bd_abog_celular}</td>
                            <td>{dato.bd_abog_usuario_mev}</td>
                            <td>{dato.bd_abog_zona}</td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
            <button onClick={agregarRegNuevo}>Agregar un registro nuevo</button>
            {verNuevoRegistro && (<FormAbogAlta cerrarVentanaAgregarDesdeGeneral={cerrarComponenteAgregar} />)}
            {verRegConsulta !== false && (<FormAbogConsulta registro={registroSeleccionado} cerrarVentanaConsultaDesdeGeneral={cerrarComponenteConsulta} />)}
            



        </>
    );
}

export default TablaAbogGeneral;
