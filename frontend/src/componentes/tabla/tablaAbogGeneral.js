//tablaAbogGeneral.js

import React, { useEffect, useState } from 'react';
import '../css/abogados/tabla.css';
import '../css/abogados/cuerpo.css';
import '../css/abogados/ventanasEmergentes.css';
import axios from 'axios';
import FormAbogConsulta from '../formularios/abogados/formAbogConsulta';
import FormAbogAlta from '../formularios/abogados/formAbogAlta';


const TablaAbogGeneral = ({ atributo, textoBusqueda }) => {
    
    //estado para almacenar la coleccion todos o parcial para la tabla
    const [datos, setDatos] = useState([]);

    //estado para almacenar el registro seleccionado
    const [registroSeleccionado, setRegistroSeleccionado] = useState([]);
    
    

    //estado para manejar errores
    const [error, setError] = useState('');


    //********************PAGINACION********************************************** */
    //* paginacion definicion del numero de registros por pagina, 
    // total de registros y pagina actual
    const [paginaAcutal, setPaginaAcutal] = useState(1);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);

    const indiceInicio = (paginaAcutal - 1) * registrosPorPagina;
    // primer muestra:    (1-1)*5     (0)*5  = 0 es el indice de inicio
    // segunda muestra: (2-1)*5  = 5 es el indice de inicio (indice 6 del arreglo)

    const indiceFin = indiceInicio + registrosPorPagina;
    // primer muestra:    0+5 = 5 es el indice de finalizacion de la pagina 1
    // segunda muestra:    5+5 = 10 es el indice de finalizacion de la pagina 2

    const datosPaginados = datos.slice(indiceInicio, indiceFin);
    //porcion del arreglo que se guardara en datosPaginados 
    // El índice de inicio es inclusivo, mientras que el de fin es exclusivo.
    // fin-1

    const siguientePagina = () => {
        if (paginaAcutal * registrosPorPagina < datos.length) {
            // primer muestra: 1*5 < cantidad de elementos del arreglo
            // si es mayor a 5 los registros pasar al proximo
            setPaginaAcutal(paginaAcutal + 1);
        }
    }

    const paginaAnterior = () => {
        if (paginaAcutal > 1) {
            // si la pagina es mayor a 1 entonces puedo retroceder
            setPaginaAcutal(paginaAcutal - 1);
        }
    }



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

    //*************ATENCION CONEXION WEB DENTRO DE LA LAN */
    //* IP FIJA DEL SERVER EN LA LAN
    //* SETEO DEL FIREWALL PUERTOS 3001, 3005 Y 27017 QUE SE PERMITAN TODAS LAS IP DE LA RED
    //* CORS TODAS LAS DIRECCIONES
    //* SETEO DEL SERVIDOR CON IP FIJA (NODE)
    //* NODE CORS TODO Middleware --> app.use(cors());
    //* MONGODB COMPASS   MONGODB_URI=mongodb://192.168.18.100:27017/SorteoAbogados


    // funcion para obtener todos los datos de la coleccion
    const todosLosDatos = async () => {
        //alert('mostrar todos los datos atributo y textoBusqueda estan vacios');
        let rutaTodos = `http://192.168.18.100:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`;
        try {
            const resultadoTodos = await axios.get(rutaTodos);
            // resultado . data . coleccion en mongo
            setDatos(resultadoTodos.data.abogados_collections);
        } catch (error) {
            capturaErroresServidor(error);
        }
    }

    // funcion para obtener todos los datos de la coleccion que coincidan con el cuit
    const datosPorCuit = async () => {
        //Verifica que el texto de busqueda tenga al menos 3 digitos
        if (textoBusqueda.length < 11) {
            setError(`El CUIT debe tener los once digitos para realizar la búsqueda.`);
            return;
        } else {
            setError('');
        }
        //alert('mostrar todos los datos atributo y textoBusqueda estan vacios');
        // alert('busca por cuit')
        let rutaCuit = `http://192.168.18.100:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/cuit/${textoBusqueda}`;
        //alert(rutaCuit.data.abogados_collections);
        try {
            const resultadoCuits = await axios.get(rutaCuit);
            // resultado . data . coleccion en mongo
            setDatos(resultadoCuits.data.abogados_collections);
        } catch (error) {
            capturaErroresServidor(error);
        }
    }

     // funcion para obtener todos los datos de la coleccion que coincidan con el nombre
    const datosPorNombre = async () => {
        //Verifica que el texto de busqueda tenga al menos 3 digitos
        if (textoBusqueda.length < 3) {
            setError(`El Nombre debe tener al menos tres caracteres para realizar la búsqueda.`);
            return;
        } else {
            setError('');
        }
        //alert('mostrar todos los datos atributo y textoBusqueda estan vacios');
        // alert('busca por cuit')
        let rutaNombre = `http://192.168.18.100:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/nombre/${textoBusqueda}`;
        // console.log(rutaNombre);

        try {
            const resultadoNombres = await axios.get(rutaNombre);
            // console.log(resultadoNombres.data.abogados_collections[0]);
            // resultado . data . coleccion en mongo
            setDatos(resultadoNombres.data.abogados_collections);

        } catch (error) {
            capturaErroresServidor(error);
        }
    }

    // funcion para obtener todos los datos de la coleccion que coincidan con la zona
    const datosPorZona = async () => {
        //Verifica que el texto de busqueda tenga al menos 3 digitos
        if (textoBusqueda.length < 0) {
            setError(`La zona debe tener al menos un caracteres para realizar la búsqueda.`);
            return;
        } else {
            setError('');
        }
        //alert('mostrar todos los datos atributo y textoBusqueda estan vacios');
        // alert('busca por cuit')
        let rutaZona = `http://192.168.18.100:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/zona/${textoBusqueda}`;
        // console.log(rutaNombre);

        try {
            const resultadoZona = await axios.get(rutaZona);
            // console.log(resultadoNombres.data.abogados_collections[0]);
            // resultado . data . coleccion en mongo
            setDatos(resultadoZona.data.abogados_collections);

        } catch (error) {
            capturaErroresServidor(error);
        }
    }

    const capturaErroresServidor = (error) => {
        if (error) { // Verifica si error está definido
            if (error.response) {
                setError(`Error en la respuesta del servidor: ${error.response.data}`);
            } else if (error.request) {
                setError(`Error al hacer la solicitud: ${error.request.status} - ${error.request.statusText}`);
            } else {
                setError(`Error inesperado: ${error.message}`);
            }
        } else {
            setError("Error desconocido: El objeto error es undefined");
        }


        // if (error.response) {
        //         setError(`Error en la respuesta del servidor: ${error.response.data}`);
        //     } else if (error.request) {
        //         setError(`Error al hacer la solicitud: ${error.request}`);
        //     } else {
        //         setError(`Error inesperado: ${error.message}`);
        //     }
    }


    //funcion que identifica y captura el clic de la linea 
    const tablaClic = async (cuit) => {
        let rutaBuscarCuit = `http://192.168.18.100:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/cuit/${cuit}`;
        const todoElRegistro = await axios.get(rutaBuscarCuit);
        setRegistroSeleccionado(todoElRegistro.data.abogados_collections);
        // setRegistroCliqueado(cuit);
        setVerRegConsulta(true);
    }
    //al modificar atributo y textoBusqueda
    useEffect(() => {
        if (atributo === '' || textoBusqueda==='') {
            todosLosDatos();
        } else if (atributo === 'bd_abog_cuit' && textoBusqueda.length === 11) {
            datosPorCuit();  // Búsqueda por CUIT (11 dígitos)
        } else if (atributo === 'bd_abog_nombre' && textoBusqueda.length >= 3) {
            datosPorNombre(); // Búsqueda por nombre (mínimo 3 caracteres)
        } else if (atributo === 'bd_abog_zona' && textoBusqueda.length >= 0) {
            datosPorZona();
        }

        // todosLosDatos()
    },[atributo, textoBusqueda]);

    return (
        <>
            <p>{error}</p>
            <table>
                <thead>
                    <tr>
                        <th>APELLIDO Y NOMBRE</th>
                        <th>CUIT</th>
                        <th>CELULAR</th>
                        <th>USUARIO MEV</th>
                        <th>ZONA</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.length === 0 && (
                        <tr>
                            <td colspan='5' className='tablaUnicoTextoCentrado'>Sin abogados que mostrar</td>
                        </tr>
                        )
                    }
                    {datos.length > 0 && (datosPaginados.map((dato, index) => (
                        <tr key={index} onClick={()=>tablaClic(dato.bd_abog_cuit)}>
                            <td className='nombreAbogado'>{dato.bd_abog_nombre}</td>
                            <td>{dato.bd_abog_cuit}</td>
                            <td>{dato.bd_abog_celular}</td>
                            <td>{dato.bd_abog_usuario_mev}</td>
                            <td>{dato.bd_abog_zona}</td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
            <section className='botonesControlTabla'>
                {/* llamo a paginaAnterior y deshabilito el boton
                 si se encuentra en la primer pagina */}
                <button
                    onClick={paginaAnterior} disabled={paginaAcutal === 1}>Anterior</button>
                {/* llamo a siguientePagina y 
                deshabilito si esta al final del arreglo */}
                {/* math round redondea para abajo, ceil redondea para arriba */}
                <div>Página {paginaAcutal} de {Math.ceil(datos.length / registrosPorPagina)}</div>
                <button
                    onClick={siguientePagina}
                    disabled={paginaAcutal * registrosPorPagina >= datos.length}>Siguiente</button>
            </section>
            <button onClick={agregarRegNuevo}>Agregar un registro nuevo</button>
            {verNuevoRegistro && (<FormAbogAlta cerrarVentanaAgregarDesdeGeneral={cerrarComponenteAgregar} todosLosDatos={todosLosDatos} />)}
            {verRegConsulta !== false && (<FormAbogConsulta registro={registroSeleccionado} cerrarVentanaConsultaDesdeGeneral={cerrarComponenteConsulta} todosLosDatos={todosLosDatos} />)}
        </>
    );
}

export default TablaAbogGeneral;
