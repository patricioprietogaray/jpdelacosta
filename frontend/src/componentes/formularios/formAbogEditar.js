// formAbogEditar.js      leer, actualizar y borrar registro

import React, { useEffect, useState } from 'react';
import '../css/PrincipalCuerpo.css';

const FormAbogEditar = ({ registro, cerrarVentana }) => {

    const [cargoRegistros, setCargoRegistros] = useState({
        nombre: registro.bd_abog_nombre,
        asesor: registro.bd_abog_asesor,
        celular: registro.bd_abog_celular,
        cuit: registro.bd_abog_cuit,
        defensor: registro.bd_abog_defensor,
        domicilio_electronico: registro.bd_abog_domicilio_electronico,
        domicilio_legal: registro.bd_abog_domicilio_legal,
        domicilio_real: registro.bd_abog_domicilio_real,
        email: registro.bd_abog_email,
        folio: registro.bd_abog_folio,
        horario_atencion: registro.bd_abog_horario_atencion,
        telefono_fijo: registro.bd_abog_telefono_fijo,
        usuario_mev: registro.bd_abog_usuario_mev,
        zona: registro.bd_abog_zona,
        tomo: registro.bd_abog_tomo
    })

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
    const [botonEditar, setBotonEditar] = useState(true);
    const [botonBorrar, setBotonBorrar] = useState(true);
    const [botonGuardar, setBotonGuardar] = useState(false);
    const [botonCancelar, setBotonCancelar] = useState(false);
    const [botonBorrarDefinitivamente, setBotonBorrarDefinitivamente] = useState(false);

    //atributos inputs
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);


    // cuando presiono el boton cerrar llamo a la funcion del componente padre (pasada en props)
    const handlerVolverClick = (ventanaIdentificada) => {
        cerrarVentana(ventanaIdentificada);
        // alert('cierro ventana (formAbogEditar)');
    }



    const handlerEditar = () => {
        //alert('Presiono editar');
        //muestro botones
        setBotonEditar(false);
        setBotonBorrar(false);
        setBotonBorrarDefinitivamente(false);
        setBotonGuardar(true);
        setBotonCancelar(true);
        // habilita inputs
        setIsReadOnly(false);
        setIsDisabled(false);

    }

     const handlerBorrar = () => {
        // alert('Presiono borrar');
        //muestro botones
        setBotonEditar(false);
        setBotonBorrar(false);
        setBotonGuardar(false);
        setBotonBorrarDefinitivamente(true);
        setBotonCancelar(true);
    }


    const handlerGuardar = () => {
        // alert('Presiono guardar');
        setBotonEditar(true);
        setBotonBorrar(true);
        setBotonGuardar(false);
        setBotonBorrarDefinitivamente(false);
        setBotonCancelar(false);        
        // habilita inputs
        setIsReadOnly(true);
        setIsDisabled(true);        
    }

     const handlerCancelar = () => {
        // alert('Presiono cancelar');
        setBotonEditar(true);
        setBotonBorrar(true);
        setBotonGuardar(false);
        setBotonBorrarDefinitivamente(false);
         setBotonCancelar(false); 
        // habilita inputs
        setIsReadOnly(true);
        setIsDisabled(true);        
    }

    const handlerBorrarDefinitivamente = () => {
        // alert('Borrado definitivo');
        setBotonEditar(true);
        setBotonBorrar(true);
        setBotonGuardar(false);
        setBotonBorrarDefinitivamente(false);
        setBotonCancelar(false); 
        // habilita inputs
        setIsReadOnly(true);
        setIsDisabled(true);        
    }



    //para editar el input
    useEffect(() => {
        setCargoRegistros({
            nombre: registro.bd_abog_nombre,
            asesor: registro.bd_abog_asesor,
            celular: registro.bd_abog_celular,
            cuit: registro.bd_abog_cuit,
            defensor: registro.bd_abog_defensor,
            domicilio_electronico: registro.bd_abog_domicilio_electronico,
            domicilio_legal: registro.bd_abog_domicilio_legal,
            domicilio_real: registro.bd_abog_domicilio_real,
            email: registro.bd_abog_email,
            folio: registro.bd_abog_folio,
            horario_atencion: registro.bd_abog_horario_atencion,
            telefono_fijo: registro.bd_abog_telefono_fijo,
            usuario_mev: registro.bd_abog_usuario_mev,
            zona: registro.bd_abog_zona,
            tomo: registro.bd_agog_tomo
        });
    }, [registro]);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setCargoRegistros({ ...cargoRegistros, [name]: value });
    // }

    const handleChange = (event) => {
    const { name, value } = event.target;
    setCargoRegistros(prevState => ({
        ...prevState,
        [name]: value
    }), () => {
        alert("value: " + value);
    });
}


    // const handleChange = (event => {
    //     const { name, value } = event.target;
    //     setCargoRegistros({ ...cargoRegistros, [name]: value });
    // })

    // const modificarNombre = (event) => {
    //     setNombre(event.target.value);
    // }

    // const modificarTomo = (event) => {
    //     setTomo(event.target.value);
    // }

    // const modificarFolio = (event) => {
    //     setFolio(event.target.value);
    // }
    // const modificarCuit = (event) => {
    //     setCuit(event.target.value);
    // }
    // const modificarDomReal = (event) => {
    //     setDomReal(event.target.value);
    // }
    // const modificarTelefono = (event) => {
    //     setTelefono(event.target.value);
    // }
    // const modificarCelular = (event) => {
    //     setCelular(event.target.value);
    // }
    // const modificarEmail = (event) => {
    //     setEmail(event.target.value);
    // }
    // const modificarDomElec = (event) => {
    //     setDomElec(event.target.value);
    // }
    // const modificarAsesor = (event) => {
    //     setAsesor(event.target.value);
    // }
    // const modificarDefensor = (event) => {
    //     setDefensor(event.target.value);
    // }
    // const modificarDomLegal = (event) => {
    //     setDomLegal(event.target.value);
    // }
    // const modificarZona = (event) => {
    //     setZona(event.target.value);
    // }
    // const modificarHorario = (event) => {
    //     setHorario(event.target.value);
    // }

    // const modificarMev = (event) => {
    //     setMev(event.target.value);
    // }


    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <h4>{registro.bd_abog_nombre} </h4>
                <div className='close-button' onClick={()=>handlerVolverClick('ventanaVerRegistro')}></div>
            </section>
            
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Nombres y Apellidos: </label>
                        <input className='anchoGrande espaciado' name='nombre' value={cargoRegistros.nombre} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
                    </div>
                <div>
                    <label>Tomo: </label>
                    <input className='anchoChico textoDerecha espaciado' name='tomo' value={cargoRegistros.tomo} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} />
                </div>
                <div>
                    <label>Folio: </label>
                    <input className='anchoChico textoDerecha espaciado' name='folio' value={cargoRegistros.folio} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>C.U.I.T.: </label>
                    <input className='anchoMediano espaciado' name='cuit' value={cargoRegistros.cuit} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} /> 
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Real: </label>
                    <input className='anchoGrandisimo espaciado' name='domicilio_real' value={cargoRegistros.domicilio_real} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>Teléfono Fijo: </label>
                    <input className='anchoMediano espaciado' name='telefono_fijo' value={cargoRegistros.telefono_fijo} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Celular: </label>
                    <input className='anchoMediano espaciado' name='celular' value={cargoRegistros.celular} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>E - Mail: </label>
                    <input className='anchoGrande espaciado' name='email' value={cargoRegistros.email} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Electrónico: </label>
                    <input className='anchoGrande espaciado' name='domicilio_electronico' value={cargoRegistros.domicilio_electronico} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>Asesor: </label>
                    <select className='anchoChicoOpcion espaciado' name='asesor' value={cargoRegistros.asesor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> 
                <div>
                    <label>Defensor: </label>
                    <select className='anchoChicoOpcion espaciado' name='defensor' value={cargoRegistros.defensor} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> 
            </section>            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal: </label>
                    <input className='anchoGrandisimo espaciado' name='domicilio_legal' value={cargoRegistros.domicilio_legal} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>Zona de Sorteo: </label>
                    <select value={cargoRegistros.zona} name='zona' onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled} >
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Horario de Atención: </label>
                    <input className='anchoGrandisimo' name='horario_atencion' value={cargoRegistros.horario_atencion} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input className='anchoMediano' name='usuario_mev' value={cargoRegistros.usuario_mev} onChange={handleChange} readOnly={isReadOnly} disabled={isDisabled}/>
                </div>
            </section>
            <div className='botonesAccion'>
                {botonEditar && <button onClick={handlerEditar}>Editar</button>}
                {botonBorrar && <button onClick={handlerBorrar}>Borrar</button>}
                {botonGuardar && <button onClick={handlerGuardar}>Guardar</button>}
                {botonBorrarDefinitivamente && <button onClickCapture={handlerBorrarDefinitivamente}>Borrar Definitivamente</button>}
                {botonCancelar && <button onClick={handlerCancelar}>Cancelar</button>}
            </div>
            
            
        </div>
    );
}

export default FormAbogEditar;
