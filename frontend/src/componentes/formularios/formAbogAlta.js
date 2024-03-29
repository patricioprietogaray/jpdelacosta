//formAbogAlta.js

import React from 'react';
import '../css/PrincipalCuerpo.css';

const FormAbogAlta = ({ cerrarVentana }) => {
    
    // al cerrar la ventana envio info al padre para que se cierre solo esta ventana!
    const handlerVolverClick = (ventanaIdentificada) => {
        cerrarVentana(ventanaIdentificada);
        // alert("cierro ventana (formAbogAlta)");
    }


    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <article>
                    <h4>Crear un nuevo registro</h4>
                </article>
                {/* modifico los parametros de la funcion que es pasada por props 
                para el cierre de la ventana */}
                <article className='close-button' onClick={()=>handlerVolverClick('ventanaNuevoRegistro')}>
                </article>
            </section>
            
        </div>
    );
}

export default FormAbogAlta;


// import React, { useState } from 'react';
// import '../css/PrincipalCuerpo.css';
// import axios from 'axios';

// const FormAbogAlta = ({ cerrarVentana }) => {
//     //estado inicial
//     const initialState = {
//         bd_abog_cuit: '',
//         bd_abog_nombre: '',
//         bd_abog_tomo: '', // Establecer el valor por defecto
//         bd_abog_folio: '', // Establecer el valor por defecto
//         bd_abog_asesor: false, // Establecer el valor por defecto
//         bd_abog_defensor: false, // Establecer el valor por defecto
//         bd_abog_domicilio_electronico: '', // Establecer el valor por defecto
//         bd_abog_email: '', // Establecer el valor por defecto
//         bd_abog_horario_atencion: '', // Establecer el valor por defecto
//         bd_abog_domicilio_real: '', // Establecer el valor por defecto
//         bd_abog_celular: '', // Establecer el valor por defecto
//         bd_abog_telefono_fijo: '', // Establecer el valor por defecto
//         bd_abog_zona: '', // Establecer el valor por defecto
//         bd_abog_domicilio_legal: '', // Establecer el valor por defecto
//         bd_abog_usuario_mev: '' // Establecer el valor por defecto
//     };
    
    
    
//     // atributos en balco y en cero
//     // en vez de usar cada atributo por separado lo unifique en un objeto
//     const [abogado, setAbogado] = useState(initialState);

//     const handleChange = (e) => {
//         // alert(`name: ${e.target.name} - value: ${e.target.value}`);
//         setAbogado({ ...abogado, [e.target.name]: e.target.value });
//     };

//     const handleAgregar = async () => {
//         try {
//             // guarda los datos
//             await axios.post('http://localhost:3001/abogados', abogado);
//             // limpia el formulario despues de guardar
//             setAbogado(initialState);
//             alert('Abogado agregado correctamente!');
//         } catch (error) {
//             console.error('Error al agregar el abogado: ', error);
//             alert('Error al agregar al Abogado correctamente!');
//         }
//     }

//     const handleCancelar = () => {
//         setAbogado(initialState);
//     }

//     // botones
//     const [botonGuardar, setBotonGuardar] = useState(false);
//     const [botonCancelar, setBotonCancelar] = useState(false);

//     //propiedades de los atributos disabled y onlyread
//     const [isDisabled, setIsDisabled] = useState(false);
//     const [isReadOnly, setIsReadOnly] = useState(false);

//     // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
//     const handlerVolverClick = () => {
//         cerrarVentana();
//     }


//     return (
//         <>
//             <div className='ventanaEmergente'>
//                 <section className='barraTitulo'>
//                     {/* <h4>{registro.bd_abog_nombre} </h4> */}
//                     <h4>{abogado.bd_abog_nombre} </h4>
//                 <div className='close-button' onClick={handlerVolverClick}></div>
//             </section>
            
//                 <section className='seccionDisplayFlex'>
//                     <div>
//                         <label>Nombres y Apellidos: </label>
//                         <input className='anchoGrande espaciado' value={abogado.nombre} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
//                     </div>
//                 <div>
//                     <label>Tomo: </label>
//                     <input className='anchoChico textoDerecha espaciado' value={abogado.tomo} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
//                 </div>
//                 <div>
//                     <label>Folio: </label>
//                     <input className='anchoChico textoDerecha espaciado' value={abogado.folio} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>C.U.I.T.: </label>
//                     <input className='anchoMediano espaciado' value={abogado.cuit} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Real: </label>
//                     <input className='anchoGrandisimo espaciado' value={abogado.domReal} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Teléfono Fijo: </label>
//                     <input className='anchoMediano espaciado' value={abogado.telefono} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Celular: </label>
//                     <input className='anchoMediano espaciado' value={abogado.celular} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>E - Mail: </label>
//                     <input className='anchoGrande espaciado' value={abogado.email} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domiclio Electrónico: </label>
//                     <input className='anchoGrande espaciado' value={abogado.domElec} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Asesor: </label>
//                     <select className='anchoChicoOpcion espaciado' value={abogado.asesor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div> 
//                 <div>
//                     <label>Defensor: </label>
//                     <select className='anchoChicoOpcion espaciado' value={abogado.defensor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div> 
//             </section>            
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Legal: </label>
//                     <input className='anchoGrandisimo espaciado' value={abogado.domLegal} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Zona de Sorteo: </label>
//                     <select value={abogado.zona} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} >
//                         <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
//                         <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
//                         <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
//                     </select>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Horario de Atención: </label>
//                     <input className='anchoGrandisimo' value={abogado.horario} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Usuario M.E.V.: </label>
//                     <input className='anchoMediano' value={abogado.mev} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//                 <div className='botonesAccion'>
//                     <button onClick={handleAgregar}>Agregar</button>
//                     <button onClick={handleCancelar}>Cancelar</button>
//                 </div>
//         </div>
//     </>
//     );
// }

// export default FormAbogAlta;


// formAbogEditar.js      leer, actualizar y borrar registro



// const FormAbogEditar = ({ registro, cerrarVentana }) => {

    // editar los atributos
    // const [nombre, setNombre] = useState(registro.bd_abog_nombre);
    // const [tomo, setTomo] = useState(String(registro.bd_agog_tomo));
    // const [folio, setFolio] = useState(String(registro.bd_abog_folio));
    // const [cuit, setCuit] = useState(registro.bd_abog_cuit);
    // const [domReal, setDomReal] = useState(registro.bd_abog_domicilio_real);
    // const [telefono, setTelefono] = useState(registro.bd_abog_telefono_fijo);
    // const [celular, setCelular] = useState(registro.bd_abog_celular);
    // const [email, setEmail] = useState(registro.bd_abog_email);
    // const [domElec, setDomElec] = useState(registro.bd_abog_domicilio_electronico);
    // const [asesor, setAsesor] = useState(registro.bd_abog_asesor);
    // const [defensor, setDefensor] = useState(registro.bd_abog_defensor);
    // const [domLegal, setDomLegal] = useState(registro.bd_abog_domicilio_legal);
    // const [zona, setZona] = useState(registro.bd_abog_zona);
    // const [horario, setHorario] = useState(registro.bd_abog_horario_atencion);
    // const [mev, setMev] = useState(registro.bd_abog_usuario_mev);
    

    //botones
    // const [botonEditar, setBotonEditar] = useState(true);
    // const [botonBorrar, setBotonBorrar] = useState(true);
    // const [botonGuardar, setBotonGuardar] = useState(false);
    // const [botonCancelar, setBotonCancelar] = useState(false);
    // const [botonBorrarDefinitivamente, setBotonBorrarDefinitivamente] = useState(false);

    //atributos inputs
    // const [isReadOnly, setIsReadOnly] = useState(true);
    // const [isDisabled, setIsDisabled] = useState(true);


    // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
    // const handlerVolverClick = () => {
    //     cerrarVentana();
    // }



    // const handlerEditar = () => {
        //alert('Presiono editar');
        //muestro botones
        // setBotonEditar(false);
        // setBotonBorrar(false);
        // setBotonBorrarDefinitivamente(false);
        // setBotonGuardar(true);
        // setBotonCancelar(true);
        // habilita inputs
        // setIsReadOnly(false);
        // setIsDisabled(false);

    // }

//      const handlerBorrar = () => {
//         // alert('Presiono borrar');
//         //muestro botones
//         setBotonEditar(false);
//         setBotonBorrar(false);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(true);
//         setBotonCancelar(true);
//     }


//     const handlerGuardar = () => {
//         // alert('Presiono guardar');
//         setBotonEditar(true);
//         setBotonBorrar(true);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(false);
//         setBotonCancelar(false);        
//         // habilita inputs
//         setIsReadOnly(true);
//         setIsDisabled(true);        
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

//     const handlerBorrarDefinitivamente = () => {
//         // alert('Borrado definitivo');
//         setBotonEditar(true);
//         setBotonBorrar(true);
//         setBotonGuardar(false);
//         setBotonBorrarDefinitivamente(false);
//         setBotonCancelar(false); 
//         // habilita inputs
//         setIsReadOnly(true);
//         setIsDisabled(true);        
//     }


//     const modificarNombre = (event) => {
//         setNombre(event.target.value);
//     }

//     const modificarTomo = (event) => {
//         setTomo(event.target.value);
//     }

//     const modificarFolio = (event) => {
//         setFolio(event.target.value);
//     }
//     const modificarCuit = (event) => {
//         setCuit(event.target.value);
//     }
//     const modificarDomReal = (event) => {
//         setDomReal(event.target.value);
//     }
//     const modificarTelefono = (event) => {
//         setTelefono(event.target.value);
//     }
//     const modificarCelular = (event) => {
//         setCelular(event.target.value);
//     }
//     const modificarEmail = (event) => {
//         setEmail(event.target.value);
//     }
//     const modificarDomElec = (event) => {
//         setDomElec(event.target.value);
//     }
//     const modificarAsesor = (event) => {
//         setAsesor(event.target.value);
//     }
//     const modificarDefensor = (event) => {
//         setDefensor(event.target.value);
//     }
//     const modificarDomLegal = (event) => {
//         setDomLegal(event.target.value);
//     }
//     const modificarZona = (event) => {
//         setZona(event.target.value);
//     }
//     const modificarHorario = (event) => {
//         setHorario(event.target.value);
//     }

//     const modificarMev = (event) => {
//         setMev(event.target.value);
//     }


//     return (
//         <div className='ventanaEmergente'>
//             <section className='barraTitulo'>
//                 <h4>{registro.bd_abog_nombre} </h4>
//                 <div className='close-button' onClick={handlerVolverClick}></div>
//             </section>
            
//                 <section className='seccionDisplayFlex'>
//                     <div>
//                         <label>Nombres y Apellidos: </label>
//                         <input className='anchoGrande espaciado' value={nombre} onChange={modificarNombre} readOnly={isReadOnly} disabled={isDisabled} />
//                     </div>
//                 <div>
//                     <label>Tomo: </label>
//                     <input className='anchoChico textoDerecha espaciado' value={tomo} onChange={modificarTomo} readOnly={isReadOnly} disabled={isDisabled} />
//                 </div>
//                 <div>
//                     <label>Folio: </label>
//                     <input className='anchoChico textoDerecha espaciado' value={folio} onChange={modificarFolio} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>C.U.I.T.: </label>
//                     <input className='anchoMediano espaciado' value={cuit} onChange={modificarCuit} readOnly={isReadOnly} disabled={isDisabled} />
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Real: </label>
//                     <input className='anchoGrandisimo espaciado' value={domReal} onChange={modificarDomReal} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Teléfono Fijo: </label>
//                     <input className='anchoMediano espaciado' value={telefono} onChange={modificarTelefono} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Celular: </label>
//                     <input className='anchoMediano espaciado' value={celular} onChange={modificarCelular} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>E - Mail: </label>
//                     <input className='anchoGrande espaciado' value={email} onChange={modificarEmail} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domiclio Electrónico: </label>
//                     <input className='anchoGrande espaciado' value={domElec} onChange={modificarDomElec} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Asesor: </label>
//                     <select className='anchoChicoOpcion espaciado' value={asesor} onChange={modificarAsesor} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div> 
//                 <div>
//                     <label>Defensor: </label>
//                     <select className='anchoChicoOpcion espaciado' value={defensor} onChange={modificarDefensor} readOnly={isReadOnly} disabled={isDisabled}>
//                         <option value='true'>SI</option>
//                         <option value='false'>NO</option>
//                     </select>
//                 </div> 
//             </section>            
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Domicilio Legal: </label>
//                     <input className='anchoGrandisimo espaciado' value={domLegal} onChange={modificarDomLegal} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Zona de Sorteo: </label>
//                     <select value={zona} onChange={modificarZona} readOnly={isReadOnly} disabled={isDisabled} >
//                         <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
//                         <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
//                         <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
//                     </select>
//                 </div>
//             </section>
//             <section className='seccionDisplayFlex'>
//                 <div>
//                     <label>Horario de Atención: </label>
//                     <input className='anchoGrandisimo' value={horario} onChange={modificarHorario} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//                 <div>
//                     <label>Usuario M.E.V.: </label>
//                     <input className='anchoMediano' value={mev} onChange={modificarMev} readOnly={isReadOnly} disabled={isDisabled}/>
//                 </div>
//             </section>
//             <div className='botonesAccion'>
//                 {botonEditar && <button onClick={handlerEditar}>Editar</button>}
//                 {botonBorrar && <button onClick={handlerBorrar}>Borrar</button>}
//                 {botonGuardar && <button onClick={handlerGuardar}>Guardar</button>}
//                 {botonBorrarDefinitivamente && <button onClickCapture={handlerBorrarDefinitivamente}>Borrar Definitivamente</button>}
//                 {botonCancelar && <button onClick={handlerCancelar}>Cancelar</button>}
//             </div>
            
            
//         </div>
//     );
// }

// export default FormAbogEditar;
