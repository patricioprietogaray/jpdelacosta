import React, { useState, useEffect }  from 'react';
import './css/botonesBusqueda.css';
import axios from 'axios';

const BuscarLetrado = () => {

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
    //hay mas datos que mostrar
    const [masDatos, setMasDatos] = useState(false);
    //no hay mas datos que mostrar
    const [noHayMasDatos, setNoHayMasDatos] = useState(false);
    //consultar por cuit
    // const [consultaBD, setConsultaBD] = useState([]);
    const [mostrarConsulta, setMostrarConsulta] = useState(false);
    const [mensajeConsulta, setMensajeConsulta] = useState('');

    //mostrar el componente mostrarCajaTextoCreate
    // const [mostrarCajaTextoCreate, setMostrarCajaTextoCreate] = useState(false);
    

    //funciones
    //cargar la opcion
    const cambiosOpcionBusqueda = (event) => {
        setOpcionBusqueda(event.target.value);
        setNoHayMasDatos(false);
        setMasDatos(false);
    }
    //cargara el dato ingresado en el texto de busqueda
    const cambiosTextoBusqueda = (event) => {
        setTextoBusqueda(event.target.value);
        setNoHayMasDatos(false);
        setMasDatos(false);
    }

    const buscarElAbogado = (opcionBusqueda, textoBusqueda) => {
        setNoHayMasDatos(false);
        setMasDatos(false);
        // alert("buscar el abogado: opc de busq: "+opcionBusqueda+ ", texto de busq: "+textoBusqueda);
        if (opcionBusqueda === '' && textoBusqueda === '') {
            setMensajeAlBuscar("No hay nada que mostrar!");
        } else if ((opcionBusqueda === 'bd_abog_cuit' || opcionBusqueda === 'bd_abog_nombre') && textoBusqueda === '') {
                setMensajeAlBuscar("El texto está vacío!");
        } else if (opcionBusqueda === 'bd_abog_nombre' && textoBusqueda !== '') {
            // setMensajeAlBuscar("buscando por nombre.....");
            const { bd_abog_cuit, bd_abog_nombre } = abogadosBD.find(reg => reg.bd_abog_nombre === textoBusqueda);
            console.log(bd_abog_cuit);
            console.log(bd_abog_nombre);
        } else if (opcionBusqueda === 'bd_abog_cuit' && Number(textoBusqueda)) {
            setMensajeAlBuscar("buscando por cuit.....");
            if (abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda)) !== undefined) {
                const { bd_abog_cuit, bd_abog_nombre } = abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda));
                setResultado(`Ha encontrado a ${bd_abog_cuit} - ${bd_abog_nombre} en la lista!`);
                setMasDatos(true);
                setNoHayMasDatos(false);
            } else {
                setResultado("El CUIT no se encuentra en la base de datos!");
                setNoHayMasDatos(true);
                setMasDatos(false);
                // mostrar caja de texto
                // console.log("llama a CajaDeTextoCreate");
                // <CajaDeTextoCreate baseDatos={baseDatos} llamado={llamado} />
                // por que no lo llama????? porque tiene que llamarse desde un estado
                // setMostrarCajaTextoCreate(true);
            }
        }
    }

    

    const consultarPorCUIT = (opcionBusqueda, textoBusqueda) => {
        
        console.log(opcionBusqueda);

              
            if (opcionBusqueda === '' && textoBusqueda === '') {
                setMensajeConsulta("No hay nada que mostrar!");
            } else if ((opcionBusqueda === 'bd_abog_cuit' || opcionBusqueda === 'bd_abog_nombre') && textoBusqueda === '') {
                setMensajeConsulta("El texto está vacío!");
            } else if (opcionBusqueda === 'bd_abog_nombre' && textoBusqueda !== '') {
                setMensajeConsulta("buscando por nombre.....");
                const abogadoEncontrado = abogadosBD.find(reg => reg.bd_abog_nombre === textoBusqueda);
                if (abogadoEncontrado) {
                    const { bd_abog_cuit,
                        bd_abog_nombre,
                        bd_abog_tomo,
                        bd_abog_folio,
                        bd_abog_asesor,
                        bd_abog_defensor,
                        bd_abog_domicilio_electronico,
                        bd_abog_email,
                        bd_abog_celular,
                        bd_abog_telefono_fijo,
                        bd_abog_zona,
                        bd_abog_domicilio_legal,
                        bd_abog_usuario_mev } = abogadoEncontrado;
                    setMensajeConsulta(`${bd_abog_nombre}, con CUIT ${bd_abog_cuit}, tomo ${bd_abog_tomo} y 
                                folio ${bd_abog_folio}, con domicilio electrónico ${bd_abog_domicilio_electronico}.
                                El número de telefono fijo es ${bd_abog_telefono_fijo}, y celular ${bd_abog_celular},
                                domicilio legal ${bd_abog_domicilio_legal}, zona ${bd_abog_zona}, 
                                anotado en el listado de defensores ${bd_abog_defensor} y asesor ${bd_abog_asesor}. 
                                Correo electrónico ${bd_abog_email} Usuario MEV ${bd_abog_usuario_mev}.`);
                    setMostrarConsulta(true);
                } else {
                    setMensajeAlBuscar("No se encontró ningún abogado con ese nombre!");
                    setMostrarConsulta(false); 
                }
                
                
                
            } else if (opcionBusqueda === 'bd_abog_cuit' && Number(textoBusqueda)) {
                setMensajeConsulta("buscando por cuit.....");
                const { bd_abog_cuit,
                    bd_abog_nombre,
                    bd_abog_tomo,
                    bd_abog_folio,
                    bd_abog_asesor,
                    bd_abog_defensor,
                    bd_abog_domicilio_electronico,
                    bd_abog_email,
                    bd_abog_celular,
                    bd_abog_telefono_fijo,
                    bd_abog_zona,
                    bd_abog_domicilio_legal,
                    bd_abog_usuario_mev } = abogadosBD.find(
                        reg => reg.bd_abog_cuit === Number(textoBusqueda)
                    );
                setMensajeConsulta(`${bd_abog_nombre}, con CUIT ${bd_abog_cuit}, tomo ${bd_abog_tomo} y 
                                folio ${bd_abog_folio}, con domicilio electrónico ${bd_abog_domicilio_electronico}.
                                El número de telefono fijo es ${bd_abog_telefono_fijo}, y celular ${bd_abog_celular},
                                domicilio legal ${bd_abog_domicilio_legal}, zona ${bd_abog_zona}, 
                                anotado en el listado de defensores ${bd_abog_defensor} y asesor ${bd_abog_asesor}. 
                                Correo electrónico ${bd_abog_email} Usuario MEV ${bd_abog_usuario_mev}.`);
                
                
                
                if (abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda)) !== undefined) {
                    const { bd_abog_cuit } = abogadosBD.find(reg => reg.bd_abog_cuit === Number(textoBusqueda));
                    setResultado(`Ha encontrado a ${bd_abog_cuit} en la lista!`);
                    setMensajeConsulta(true);
                } else {
                    setResultado("El CUIT no se encuentra en la base de datos!");
                    setMensajeConsulta(false);
                }
            }
            setMostrarConsulta(true);
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
            <h2>Búsqueda de un letrado</h2>
            <label>Seleccione una opción: </label>
            <select id='buscarCuitNombre' value={opcionBusqueda} onChange={cambiosOpcionBusqueda}>
                <option value={''}>Seleccionar ...</option>
                <option value={'bd_abog_cuit'}>Buscar por CUIT</option>
                <option value={'bd_abog_nombre'}>Buscar por Nombre</option>
            </select>
            <input id='cajaTextoBusqueda' value={textoBusqueda} onChange={cambiosTextoBusqueda} />
            <button onClick={() => buscarElAbogado(opcionBusqueda, textoBusqueda)}>Encontrar al abogado segun {opcionBusqueda === 'bd_abog_cuit' ? 'cuit' : 'nombre'}</button>
            <br></br>
            {/* {mensajeAlBuscar}<br/> */}
            {/* {resultado && (`El cuit ${resultado.bd_abog_cuit} coincide con ${resultado.bd_abog_nombre}`)} */}
            {resultado!=='' ? <p>{resultado}</p> : <p>Error: No hay registros que mostrar!</p>}
            {/* <p>Ha encontrado a {resultado} en la lista!</p> */}
            {/* {mostrarCajaTextoCreate && (<CajaDeTextoCreate />)} */}
            {masDatos===true && (
                <div>
                    <button onClick={()=>consultarPorCUIT(opcionBusqueda, textoBusqueda)}>Consultar el CUIT {textoBusqueda}</button>
                    <button>Actualizar el CUIT {textoBusqueda}</button>
                    <button>Borrar el CUIT {textoBusqueda}</button>
                </div>
            )}
            {noHayMasDatos===true && (
                <div>
                    <button>Agregar el CUIT {textoBusqueda}</button>
                </div>
            )}
            {mostrarConsulta===true && (
                <div>
                    {mensajeConsulta}
                </div>
            )}
        </div>
    );
}

export default BuscarLetrado;
