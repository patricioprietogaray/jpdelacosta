// formAbogEditar.js     actualizar registro

import React, { useEffect, useState } from 'react';
import '../css/PrincipalCuerpo.css';
import axios from 'axios';

const FormAbogEditar = ({ registro, cerrarVentanaEditar }) => {

    //alert('datos: ' + datos.bd_abog_nombre);
    //alert('registro: ' + registro[0].bd_abog_nombre);
    

    //*************************************************************************** */
    //** LLamado a la funcion cerrar desde el componente consultas */
    // ventana volver desde editar
    const handlerVolverClickConsulta = () => {
        cerrarVentanaEditar();
    }
    //llamo a la funcion cerrar del componente anterior que muestra el componete actual
    // sin codigo por tratarse de la primera llamada a los componentes hijos

    //************************************************************************** */
    //defino a la funcion cerrar del componente actual que mostrará el componente que llamo desde aqui
    //codigo de cierre del componente hijo
    // no se puede cerrar un componente cuando estoy en el debo enviar la orden de cierre
    // desde el lugar que es llamado es por eso qe paso como parametro la funcion de cierre
    //NO HAY COMPONENTES HIJOS

    
    //datos
    const [datos, setDatos] = useState([]);

    //actualizar datos -> useEffect
    //escucha los cambios en el registro
    //la primera vez en la carga

    useEffect(() => {
        setDatos(registro[0])
    },[registro]);
    

    //atributos
    //const [id, setId] = useState(datos._id);

   //edicion de inputs
    // const inputEditado = (e) => {
    //     setDatos({ ...datos, [e.target.name]: e.target.value })
    // }

    //edito inputs y checkbox
    const inputEditado = (e) => {
        const { name, type, checked } = e.target;
        // Si es un checkbox, actualiza el estado según si está marcado o no    
        // if (type === 'checkbox') {
        //setDatos({ ...datos, [name]: checked });
        setDatos(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : e.target.value
        }));
        // if (checked) {
        //     alert(`Checkbox ${name} marcado`);
        // } else {
        //     alert(`Checkbox ${name} desmarcado`);
        // }
        // } else {
        // Para otros tipos de inputs, actualiza el estado según el valor ingresado
        // setDatos({ ...datos, [name]: value });
        // }
    };



    //guardar los datos en el servidor
    const handlerGuardarModificacion = async() => {
        // {registro.bd_abog_cuit} es el dato original que llega y no esta editado de ninguna manera
        // por este componente
        // alert('datos: ' + datos.bd_abog_nombre);
        // alert('registro: '+registro.bd_abog_nombre);
        try {
            const respuestaModificada = await axios.put(`http://localhost:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/actualizar/${registro[0].bd_abog_cuit}`, datos);
            setDatos(respuestaModificada.data.collectionsAbogados);
        } catch (error) {
            alert('Mensaje de error: ' + error.message);
            //cerrar la ventana actual
            //handlerVolverClick('verVentanaEdicion');
        }
        //cerrar la ventana actual
        handlerVolverClickConsulta();
        //cerrarVentanaEditar();
        // alert('cierro ventana editar.....');
    }

    return (
        <form>
            <section className='barraTitulo'>
                {/* hasta que no guarde no se modifican en el registro */}
                <h4>Editar al abogado: {registro[0].bd_abog_nombre} </h4>
                <div className='close-button' onClick={()=>handlerVolverClickConsulta()}></div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Nombres y Apellidos:</label>
                    <input
                        name='bd_abog_nombre'
                        value={datos.bd_abog_nombre}
                        className='anchoGrande espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Tomo:</label>
                    <input
                        name='bd_abog_tomo'
                        value={datos.bd_abog_tomo}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>Folio:</label>
                    <input
                        name='bd_abog_folio'
                        value={datos.bd_abog_folio}
                        className='anchoChico textoDerecha espaciado'
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>CUIT:</label>
                    <input
                        name='bd_abog_cuit'
                        value={datos.bd_abog_cuit}
                        className='anchoMediano espaciado'
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Real: </label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio_real'
                        value={datos.bd_abog_domicilio_real}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Teléfono Fijo: </label>
                    <input
                        className='anchoMediano espaciado'
                        name='bd_abog_telefono_fijo'
                        value={datos.bd_abog_telefono_fijo}
                        onChange={inputEditado} />
                </div>
                <div>
                    <label>Celular:</label>
                    <input
                        className='anchoMediano espaciado'
                        name='bd_abog_celular'
                        value={datos.bd_abog_celular}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>E - Mail:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_email'
                        value={datos.bd_abog_email}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Electrónico:</label>
                    <input
                        className='anchoGrande espaciado'
                        name='bd_abog_domicilio_electronico'
                        value={datos.bd_abog_domicilio_electronico}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Asesor:</label>
                    <input
                        type="checkbox"
                        name="bd_abog_asesor"
                        checked={datos.bd_abog_asesor}
                        onChange={inputEditado}
                    />
                </div>
                <div>
                    <label>Defensor:</label>
                    <input
                        type="checkbox"
                        name="bd_abog_defensor"
                        checked={datos.bd_abog_defensor}
                        onChange={inputEditado}
                    />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal:</label>
                    <input
                        className='anchoGrandisimo espaciado'
                        name='bd_abog_domicilio_legal'
                        value={datos.bd_abog_domicilio_legal}
                        onChange={inputEditado}/>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Zona de Sorteo:</label>
                    <select
                        value={datos.bd_abog_zona}
                        name='bd_abog_zona'
                        onChange={inputEditado}
                    >
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Horario de Atención: </label>
                    <input
                        className='anchoGrandisimo'
                        name='bd_abog_horario_atencion'
                        value={datos.bd_abog_horario_atencion}
                        onChange={inputEditado} />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input
                        className='anchoMediano'
                        name='bd_abog_usuario_mev'
                        value={datos.bd_abog_usuario_mev}
                        onChange={inputEditado} />
                </div>
            </section>

            <button onClick={handlerGuardarModificacion}>Guardar</button>
        </form>
    );
}

export default FormAbogEditar;


// import React, { useEffect, useState } from 'react';
// import '../css/PrincipalCuerpo.css';
// import axios from 'axios';


// const FormAbogEditar = ({ registro, cerrarVentana, actualizarListaAbogados }) => {

//     //cargo todos los atributos del parámetro registro 
//     const [cargoRegistros, setCargoRegistros] = useState({ ...registro });
//     const [editoRegistros, setEditoRegistros] = useState(null);

//     // const [cargoRegistros, setCargoRegistros] = useState({
//     //     nombre: registro.bd_abog_nombre,
//     //     asesor: registro.bd_abog_asesor,
//     //     celular: registro.bd_abog_celular,
//     //     cuit: registro.bd_abog_cuit,
//     //     defensor: registro.bd_abog_defensor,
//     //     domicilio_electronico: registro.bd_abog_domicilio_electronico,
//     //     domicilio_legal: registro.bd_abog_domicilio_legal,
//     //     domicilio_real: registro.bd_abog_domicilio_real,
//     //     email: registro.bd_abog_email,
//     //     folio: registro.bd_abog_folio,
//     //     horario_atencion: registro.bd_abog_horario_atencion,
//     //     telefono_fijo: registro.bd_abog_telefono_fijo,
//     //     usuario_mev: registro.bd_abog_usuario_mev,
//     //     zona: registro.bd_abog_zona,
//     //     tomo: registro.bd_abog_tomo
//     // })
//     // const [editoRegistros, setEditoRegistros] = useState({});

//     // editar los atributos
//     // const [nombre, setNombre] = useState(registro.bd_abog_nombre);
//     // const [tomo, setTomo] = useState(String(registro.bd_agog_tomo));
//     // const [folio, setFolio] = useState(String(registro.bd_abog_folio));
//     // const [cuit, setCuit] = useState(registro.bd_abog_cuit);
//     // const [domReal, setDomReal] = useState(registro.bd_abog_domicilio_real);
//     // const [telefono, setTelefono] = useState(registro.bd_abog_telefono_fijo);
//     // const [celular, setCelular] = useState(registro.bd_abog_celular);
//     // const [email, setEmail] = useState(registro.bd_abog_email);
//     // const [domElec, setDomElec] = useState(registro.bd_abog_domicilio_electronico);
//     // const [asesor, setAsesor] = useState(registro.bd_abog_asesor);
//     // const [defensor, setDefensor] = useState(registro.bd_abog_defensor);
//     // const [domLegal, setDomLegal] = useState(registro.bd_abog_domicilio_legal);
//     // const [zona, setZona] = useState(registro.bd_abog_zona);
//     // const [horario, setHorario] = useState(registro.bd_abog_horario_atencion);
//     // const [mev, setMev] = useState(registro.bd_abog_usuario_mev);
    

//     //botones
//     const [botonEditar, setBotonEditar] = useState(true);
//     const [botonBorrar, setBotonBorrar] = useState(true);
//     const [botonGuardar, setBotonGuardar] = useState(false);
//     const [botonCancelar, setBotonCancelar] = useState(false);
//     const [botonBorrarDefinitivamente, setBotonBorrarDefinitivamente] = useState(false);
//     const [abogadoSeleccionado, setAbogadoSeleccionado] = useState('');
//     const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
//     const [errorParaMostrar, setErrorParaMostrar] = useState('');

//     //atributos inputs
//     const [isReadOnly, setIsReadOnly] = useState(true);
//     const [isDisabled, setIsDisabled] = useState(true);


//     // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
//     const handlerVolverClick = (ventanaIdentificada) => {
//         cerrarVentana(ventanaIdentificada);
//         // alert('cierro ventana (formAbogEditar)');
//     }



//     const handlerEditar = () => {
//         //alert('Presiono editar');
//         //muestro botones
//         setBotonEditar(false);
//         setBotonBorrar(false);
//         setBotonBorrarDefinitivamente(false);
//         setBotonGuardar(true);
//         setBotonCancelar(true);
//         // habilita inputs
//         setIsReadOnly(false);
//         setIsDisabled(false);

//     }

//     const handlerBorrar = () => {
//         // alert('Presiono borrar');
//         //muestro botones
//         setBotonEditar(false);
//         setBotonBorrar(false);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(true);
//         setBotonCancelar(true);
//     }


//     const handlerGuardar = async () => {
//         // console.log('edito los registros.... ' + editoRegistros.nombre);
//         // console.log('edito los registros.... '+cargoRegistros.cuit);
//         //console.log(`http://localhost:3001/abogados/actualizar/${String(cargoRegistros.cuit)}`);
//         try {
//             const responseEditar = await axios.put(`http://localhost:3001/abogados/actualizar/${String(cargoRegistros.cuit)}`,
//                 { ...editoRegistros });
//             setMensajeParaMostrar(responseEditar.data.msg);
//             setErrorParaMostrar('');
//             // Llama a la función de actualización de la lista de abogados
//             actualizarListaAbogados();
//             handlerVolverClick('ventanaVerRegistro');
//         } catch (error) {
//             setMensajeParaMostrar('');
//             setErrorParaMostrar('Error al actualizar el abogado: ' + error.message);
//         } finally {
//                 // alert('Presiono guardar');
//             setBotonEditar(true);
//             setBotonBorrar(true);
//             setBotonGuardar(false);
//             setBotonBorrarDefinitivamente(false);
//             setBotonCancelar(false);        
//             // habilita inputs
//             setIsReadOnly(true);
//             setIsDisabled(true); 
//         }
//     }

//      const handlerCancelar = () => {
//         // alert('Presiono cancelar');
//         setBotonEditar(true);
//         setBotonBorrar(true);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(false);
//          setBotonCancelar(false); 
//         // habilita inputs
//         setIsReadOnly(true);
//         setIsDisabled(true);        
//     }

//     const handlerBorrarDefinitivamente = async() => {
//         // alert('Borrado definitivo: el id es ' + registro._id);
//         // alert('cuit: ' + registro.bd_abog_cuit);
//         try {
//             const response = await axios.delete(`http://localhost:3001/abogados/borrar/${registro.bd_abog_cuit}`);
//             setMensajeParaMostrar(response.data.msg);
//             setErrorParaMostrar('');
//             // Llama a la función de actualización de la lista de abogados
//             actualizarListaAbogados();
//             handlerVolverClick('ventanaVerRegistro');
//         } catch (error) {
//             setMensajeParaMostrar('');
//             setErrorParaMostrar('Error al borrar el abogado: ' + error.message);
//         }
//         setBotonEditar(true);
//         setBotonBorrar(true);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(false);
//         setBotonCancelar(false); 
//         // habilita inputs
//         setIsReadOnly(true);
//         setIsDisabled(true);        
//     }



//     //para editar el input
//     useEffect(() => {
//         setCargoRegistros({
//             nombre: registro.bd_abog_nombre,
//             asesor: registro.bd_abog_asesor,
//             celular: registro.bd_abog_celular,
//             cuit: registro.bd_abog_cuit,
//             defensor: registro.bd_abog_defensor,
//             domicilio_electronico: registro.bd_abog_domicilio_electronico,
//             domicilio_legal: registro.bd_abog_domicilio_legal,
//             domicilio_real: registro.bd_abog_domicilio_real,
//             email: registro.bd_abog_email,
//             folio: registro.bd_abog_folio,
//             horario_atencion: registro.bd_abog_horario_atencion,
//             telefono_fijo: registro.bd_abog_telefono_fijo,
//             usuario_mev: registro.bd_abog_usuario_mev,
//             zona: registro.bd_abog_zona,
//             tomo: registro.bd_abog_tomo
//         });
//     }, [registro]);

//     // const handleChange = (event) => {
//     //     const { name, value } = event.target;
//     //     setCargoRegistros({ ...cargoRegistros, [name]: value });
//     // }

// //     const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     setCargoRegistros(prevState => ({
// //         ...prevState,
// //         [name]: value
// //     }), () => {
// //         alert("value: " + value);
// //     });
// // }

//     const handleChange = (event) => {
//         const { name, value, type, checked } = event.target;
                
//         if (type === 'checkbox') {
//             setCargoRegistros(prevState => ({
//                 ...prevState,
//                 [name]: checked
//             }));
//             // setEditoRegistros(prevState => ({
//             //     ...prevState,
//             //     [name]: checked
//             // }));
//             // console.log('edite un check');
//         } else {
//             setCargoRegistros(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//             // setEditoRegistros(prevState => ({
//             //     ...prevState,
//             //     [name]: value
//             // }));
//             // console.log('edite un input');
//             // console.log(editoRegistros);
//         }

//         //actualizo el estado de los registros editados
        
//         setEditoRegistros(prevState => ({
//             ...prevState,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     }


//     // const handleChange = (event => {
//     //     const { name, value } = event.target;
//     //     setCargoRegistros({ ...cargoRegistros, [name]: value });
//     // })

//     // const modificarNombre = (event) => {
//     //     setNombre(event.target.value);
//     // }

//     // const modificarTomo = (event) => {
//     //     setTomo(event.target.value);
//     // }

//     // const modificarFolio = (event) => {
//     //     setFolio(event.target.value);
//     // }
//     // const modificarCuit = (event) => {
//     //     setCuit(event.target.value);
//     // }
//     // const modificarDomReal = (event) => {
//     //     setDomReal(event.target.value);
//     // }
//     // const modificarTelefono = (event) => {
//     //     setTelefono(event.target.value);
//     // }
//     // const modificarCelular = (event) => {
//     //     setCelular(event.target.value);
//     // }
//     // const modificarEmail = (event) => {
//     //     setEmail(event.target.value);
//     // }
//     // const modificarDomElec = (event) => {
//     //     setDomElec(event.target.value);
//     // }
//     // const modificarAsesor = (event) => {
//     //     setAsesor(event.target.value);
//     // }
//     // const modificarDefensor = (event) => {
//     //     setDefensor(event.target.value);
//     // }
//     // const modificarDomLegal = (event) => {
//     //     setDomLegal(event.target.value);
//     // }
//     // const modificarZona = (event) => {
//     //     setZona(event.target.value);
//     // }
//     // const modificarHorario = (event) => {
//     //     setHorario(event.target.value);
//     // }

//     // const modificarMev = (event) => {
//     //     setMev(event.target.value);
//     // }


//     return (
//         <div className='ventanaEmergente'>
//             <section className='barraTitulo'>
//                 <h4>{registro.bd_abog_nombre} </h4>
//                 <div className='close-button' onClick={()=>handlerVolverClick('ventanaVerRegistro')}></div>
//             </section>
            
//                 <section className='seccionDisplayFlex'>
//                     <div>
//                         <label>Nombres y Apellidos: </label>
//                         <input className='anchoGrande espaciado' name='nombre' value={cargoRegistros.nombre} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
//                     </div>
//                 <div>
//                     <label>Tomo: </label>
//                     <input className='anchoChico textoDerecha espaciado' name='tomo' value={cargoRegistros.tomo} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
//                 </div>
//                 <div>
//                     <label>Folio: </label>
//                     <input className='anchoChico textoDerecha espaciado' name='folio' value={cargoRegistros.folio} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>C.U.I.T.: </label>
//                     <input className='anchoMediano espaciado' name='cuit' value={cargoRegistros.cuit} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} /> 
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Real: </label>
//                     <input className='anchoGrandisimo espaciado' name='domicilio_real' value={cargoRegistros.domicilio_real} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Teléfono Fijo: </label>
//                     <input className='anchoMediano espaciado' name='telefono_fijo' value={cargoRegistros.telefono_fijo} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Celular: </label>
//                     <input className='anchoMediano espaciado' name='celular' value={cargoRegistros.celular} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>E - Mail: </label>
//                     <input className='anchoGrande espaciado' name='email' value={cargoRegistros.email} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domiclio Electrónico: </label>
//                     <input className='anchoGrande espaciado' name='domicilio_electronico' value={cargoRegistros.domicilio_electronico} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 {/* <div>
//                     <label>Asesor: </label>
//                     <select className='anchoChicoOpcion espaciado' name='asesor' value={cargoRegistros.asesor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div>  */}
//                 <div>
//                     <label>Asesor </label>
//                     <input
//                         type="checkbox"
//                         name="asesor"
//                         checked={cargoRegistros.asesor}
//                         onChange={handleChange}
//                         readOnly={isReadOnly}
//                         disabled={isDisabled}
//                     />
//                 </div>
//                 {/* <div>
//                     <label>Defensor: </label>
//                     <select className='anchoChicoOpcion espaciado' name='defensor' value={cargoRegistros.defensor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div>  */}
//                 <div>
//                     <label>Defensor </label>
//                     <input
//                         type="checkbox"
//                         name="defensor"
//                         checked={cargoRegistros.defensor}
//                         onChange={handleChange}
//                         readOnly={isReadOnly}
//                         disabled={isDisabled}
//                     />
//                 </div>
//             </section>            
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Legal: </label>
//                     <input className='anchoGrandisimo espaciado' name='domicilio_legal' value={cargoRegistros.domicilio_legal} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Zona de Sorteo: </label>
//                     <select value={cargoRegistros.zona} name='zona' onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} >
//                         <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
//                         <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
//                         <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
//                     </select>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Horario de Atención: </label>
//                     <input className='anchoGrandisimo' name='horario_atencion' value={cargoRegistros.horario_atencion} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Usuario M.E.V.: </label>
//                     <input className='anchoMediano' name='usuario_mev' value={cargoRegistros.usuario_mev} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <div className='botonesAccion'>
//                 {botonEditar && <button onClick={handlerEditar}>Editar</button>}
//                 {botonBorrar && <button onClick={handlerBorrar}>Borrar</button>}
//                 {botonGuardar && <button onClick={handlerGuardar}>Guardar</button>}
//                 {botonBorrarDefinitivamente && <button onClick={handlerBorrarDefinitivamente}>Borrar Definitivamente</button>}
//                 {/* {botonBorrarDefinitivamente && <formAbogBorrar />} */}
//                 {/* {botonBorrarDefinitivamente && <formAbogBorrar />} Renderizar el componente formAbogBorrar */}
//                 {/* {botonCancelar && <button onClick={handlerCancelar}>Cancelar</button>} */}
//             </div>        
//         </div>
//     );
// }

// export default FormAbogEditar;
