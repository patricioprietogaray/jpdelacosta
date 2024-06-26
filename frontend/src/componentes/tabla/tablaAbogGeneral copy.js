//tablaAbogGeneral.js








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/tabla.css';
import FormAbogAlta from '../formularios/formAbogAlta';
import FormAbogConsulta from '../formularios/formAbogConsulta';

// las props se pasan como un solo objeto, de lo contrario no funcionan
// {los datos se desestruturan} otra manera seria pasar props y luego props.atributo - props.text...
// const TablaAbogGeneral = (props) => {
const TablaAbogGeneral = ({ atributo, textoBusqueda }) => {
    const [abogadosDB, setAbogadosDB] = useState([]);
    const [mensajeError, setMensajeError] = useState('');
    const [registroSeleccionado, setRegistroSeleccionado] = useState('');
    const [nuevoRegistro, setNuevoRegistro] = useState(false);

    // const actualizarListaAbogados = async () => {
    //     try {
            
    //         // sugerencia const BD = await axios.get(`http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`);
    //         const response = await axios.get(
    //             `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`
    //         )
    //         // sugerencia setAbogadosDB(BD.data.abogados_collections);
    //         setAbogadosDB(response.data.abogados_collections);
    //     } catch (error) {
    //         setMensajeError('La conexion fue rechazada: ' + error.message);
    //     }
    // }

    useEffect(() => {
        const obtenerBD = async () => {
            try {
                //muestro todos los abogados
                let response;
                switch (atributo) {
                    case '':
                        // setResp("no hay datos pasados!, muestro todos la coleccion");
                        response = await axios.get(
                            `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`
                        );
                        setAbogadosDB(response.data.abogados_collections);
                        break;
                    default:
                        // setResp(`el atributo es ${atributo}`);
                        if (atributo === 'bd_abog_cuit') {
                            response = await axios.get(
                                `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/cuit/${textoBusqueda}`
                            );
                            //setAbogadosDB(BDatributoCuit.data.abogados_collections);
                        } else if (atributo === 'bd_abog_nombre') {
                            response = await axios.get(
                                `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/nombre/${textoBusqueda}`
                            );
                            // setAbogadosDB(BDatributoNombre.data.abogados_collections);
                        } else if (atributo === 'bd_abog_zona') {
                            response = await axios.get(
                                `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/zona/${textoBusqueda}`
                            );
                            // setAbogadosDB(BDatributoZona.data.abogados_collections);
                            // alert(abogadosDB);
                        }
                        setAbogadosDB(response.data.abogados_collections);
                        
                        // setAbogadosDB(BDatributo.data.abogados_collections);
                        break;
                }

            } catch (error) {
                setMensajeError('La conexion fue rechazada: ' + error.message);
            }
            // const respuestaBD = await axios
        };
        obtenerBD();
    },[atributo, textoBusqueda])  //cuando cambie atributo hace useeffect!!!

    const agregarRegNuevo = () => {
        setNuevoRegistro(true);
    }

    const cerrarVentana = (ventanaIdentificada) => {
        setNuevoRegistro(false);
    }

    // cuando recibo cerrarVentana desde el componente hijo
    // identifico desde donde llega y cierro solo esa ventana que se muestra en pantalla
    // const handlerCloseVentana = (ventanaIdentificada)=>{
    //     switch (ventanaIdentificada) {
    //         case 'ventanaVerRegistro':
    //             setVerRegistroVentanaVisible(false);
    //             // alert("cierro ventana ver registro (tablaAbogGeneral)")
    //             break;
    //         case 'ventanaNuevoRegistro':
    //             setNuevoRegistro(false);
    //             // alert("cierro ventana nuevo registro (tablaAbogGeneral)")
    //             break;
    //         default:
    //             break;
    //     }
    //     // setVerRegistroVentanaVisible(false);
    //     // setNuevoRegistro(false);
    //     // crear control individual de ventanas emergentes
    // }

    const muestraRegistro = (registroSeleccionado) => {
        // setVerRegistroVentanaVisible(true);
        setRegistroSeleccionado(registroSeleccionado);
    }




    // useEffect(() => {
    //     const obtenerBD = async () => {
    //         try {
    //             //muestro todos los abogados
    //             switch (atributo) {
    //                 case '':
    //                     // setResp("no hay datos pasados!, muestro todos la coleccion");
    //                     const BD = await axios.get(
    //                         `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/todos`
    //                     );
    //                     setAbogadosDB(BD.data.abogados_collections);
    //                     break;
    //                 default:
    //                     // setResp(`el atributo es ${atributo}`);
    //                     if (atributo === 'bd_abog_cuit') {
    //                         const BDatributoCuit = await axios.get(
    //                             `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/cuit/${textoBusqueda}`
    //                         );
    //                         setAbogadosDB(BDatributoCuit.data.abogados_collections);
    //                     } else if (atributo === 'bd_abog_nombre') {
    //                         const BDatributoNombre = await axios.get(
    //                             `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/nombre/${textoBusqueda}`
    //                         );
    //                         setAbogadosDB(BDatributoNombre.data.abogados_collections);
    //                     } else if (atributo === 'bd_abog_zona') {
    //                         const BDatributoZona = await axios.get(
    //                             `http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/zona/${textoBusqueda}`
    //                         );
    //                         setAbogadosDB(BDatributoZona.data.abogados_collections);
    //                         // alert(abogadosDB);
    //                     }
                        
    //                     // setAbogadosDB(BDatributo.data.abogados_collections);
    //                     break;
    //             }

    //         } catch (error) {
    //             setMensajeError('La conexion fue rechazada: ' + error.message);
    //         }
    //         // const respuestaBD = await axios
    //     };
    //     obtenerBD();
    // },[textoBusqueda, registroSeleccionado])  //cuando cambie atributo hace useeffect!!!

    return (
        <div>
            {abogadosDB.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <ht>NOMBRE</ht>
                            <th>CUIT</th>
                            <th>CELULAR</th>
                            <th>USUARIO MEV</th>
                            <th>ZONA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abogadosDB.map((abogado) => (
                            <tr key={abogado._id} onClick={muestraRegistro(abogado.bd_abog_cuit)}>
                                <td className='nombreAbogado'>{abogado.bd_abog_nombre}</td>
                                <td className='cuitAbogado'>{abogado.bd_abog_cuit}</td>
                                <td className='nombreAbogado'>{abogado.bd_abog_celular}</td>
                                <td className='nombreAbogado'>{abogado.bd_abog_usuario_mev}</td>
                                <td className='nombreAbogado'>{abogado.bd_abog_zona}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
                : (
                    <p>Sin datos que mostrar, verifique que el cuit ingresado es correcto!</p>
                )}
            
{/* 
            {`recibo del componente busqueda ${atributo} y ${textoBusqueda}`}
            <table>
                <thead>
                    <ht>NOMBRE</ht>
                    <th>CUIT</th>
                    <th>CELULAR</th>
                    <th>USUARIO MEV</th>
                    <th>ZONA</th>
                </thead>
                <tbody>
                    {(abogadosDB.length > 0) ? 
                        (abogadosDB.map(listaTabla => (
                            <tr key={listaTabla._id} onClick={() => muestraRegistro(listaTabla)}>
                                <td className='nombreAbogado'>{listaTabla.bd_abog_nombre}</td>
                                <td className='cuitAbogado'>{listaTabla.bd_abog_cuit}</td>
                                <td className='nombreAbogado'>{listaTabla.bd_abog_celular}</td>
                                <td className='nombreAbogado'>{listaTabla.bd_abog_usuario_mev}</td>
                                <td className='nombreAbogado'>{listaTabla.bd_abog_zona}</td>
                            </tr>
                        ))) :
                            <tr>
                                <td colSpan='5' className='tablaUnicoTextoCentrado'><button>Sin datos que mostrar</button></td>
                            </tr>}
                    </tbody>
                </table> */}
            <button onClick={agregarRegNuevo}>Agregar un registro nuevo</button>
            {nuevoRegistro && <FormAbogAlta cerrarVentana={cerrarVentana} /> }
            <p>{mensajeError}</p>
            {registroSeleccionado !== '' && (
                <FormAbogConsulta registro={registroSeleccionado} cerrarVentana={cerrarVentana} />
            )}

            {/* {nuevoRegistro && (
                <>
                    setNuevoRegistro(!nuevoRegistro);
                    {/* envio la funcion cerrarVentana al componente sin parametros */}
                    {/* <FormAbogAlta cerrarVentana={handlerCloseVentana} /> */}
                {/* </> */}
                {/* )}  */}
            {/* <p>{resp}</p> */}
            {/* <p>{mensajeError}</p> */}
            {/* {verRegistroVentanaVisible && 
                // envio la funcion cerrarVentana al componente sin parametros
                <FormAbogConsulta registro={registroSeleccionado} cerrarVentana={handlerCloseVentana} />
            } */}
        </div>
    );
}

export default TablaAbogGeneral;
