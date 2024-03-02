import React, { useState } from 'react';
import './buscarAbogado.css';

// const BuscarAbogado = ({ baseDatos }, llamado) => { //solo desestructuro baseDatos
    // como se pasan dos parametros se deben 
    //desestructurar los dos
const BuscarAbogado = ({ baseDatos, llamado }) => {
    
    // busco por cuit o nombre en la base de datos
        //mostrar el formulario
        //devolver si hubo coincidencias

    
    // segun desde donde sea el llamado muestro los datos o no


    // desde el select-option optará por cuit o nombre
    const [opcionBusqueda, setOpcionBusqueda] = useState('');

    // cargara el dato que se ha ingresado desde el input
    const [textoBusqueda, setTextoBusqueda] = useState('');

    //cargara los resultado obtenidos
    const [registros, setRegistros] = useState([]);


    //funciones
    //cambios en la opcion de busqueda
    const cambiosOpcionBusqueda = (event) => {
        setOpcionBusqueda(event.target.value);
    }

    //cambios en el texto de busqueda
    const cambiosTextoBusqueda = (event) => {
        setTextoBusqueda(event.target.value);
    }


    //resultado encontrado en la busqueda para mostrar o no los resultados
    const [resultadoCreate, setResultadoCreate] = useState(false);
    const [resultadoUpdate, setResultadoUpdate] = useState(false);
    const [resultadoQuery, setResultadoQuery] = useState(false);
    const [resultadoDelete, setResultadoDelete] = useState(false);

    //mostrar los datos completos o las etiquetas vacias
    const [mostrarEtiquetasCreate, setMostrarEtiquetasCreate] = useState(false);
    // const [mostrarEtiquetasQuery, setMostrarEtiquetasQuery] = useState(false);
    // const [mostrarEtiquetasUpdate, setMostrarEtiquetasUpdate] = useState(false);
    // const [mostrarEtiquetasDelete, setMostrarEtiquetasDelete] = useState(false);


    //atributos
    const [atributoNombre, setAtributoNombre] = useState('');
    const [atributoTomo, setAtributoTomo] = useState('');
    const [atributoFolio, setAtributoFolio] = useState('');
    const [atributoCuit, setAtributoCuit] = useState('');
    const [atributoDomReal, setAtributoDomReal] = useState('');
    const [atributoTelefono, setAtributoTelefono] = useState('');
    const [atributoCelular, setAtributoCelular] = useState('');
    const [atributoEmail, setAtributoEmail] = useState('');
    const [atributoDomElec, setAtributoDomElec] = useState('');
    const [atributoAsesor, setAtributoAsesor] = useState('');
    const [atributoDefensor, setAtributoDefensor] = useState('');
    const [atributoDomLegal, setAtributoDomLegal] = useState('');
    const [atributoAtencion, setAtributoAtencion] = useState('');
    const [atributoZona, setAtributoZona] = useState('');



    //modificar los atributos
    const handlerAtributoNombre = (event) => {
        setAtributoNombre(event.target.value);
    }
    const handlerAtributoTomo = (event) => {
        setAtributoTomo(event.target.value);
    }
    const handlerAtributoFolio = (event) => {
        setAtributoFolio(event.target.value);
    }
    const handlerAtributoCuit = (event) => {
        setAtributoCuit(event.target.value);
    }
    const handlerAtributoDomReal = (event) => {
        setAtributoDomReal(event.target.value);
    }
    const handlerAtributoTelefono = (event) => {
        setAtributoTelefono(event.target.value);
    }
    const handlerAtributoCelular = (event) => {
        setAtributoCelular(event.target.value);
    }
    const handlerAtributoEmail = (event) => {
        setAtributoEmail(event.target.value);
    }
    const handlerAtributoDomElec = (event) => {
        setAtributoDomElec(event.target.value);
    }
    const handlerAtributoAsesor = (event) => {
        setAtributoAsesor(event.target.value);
    }
    const handlerAtributoDefensor = (event) => {
        setAtributoDefensor(event.target.value);
    }
    const handlerAtributoDomLegal = (event) => {
        setAtributoDomLegal(event.target.value);
    }
    const handlerAtributoAtencion = (event) => {
        setAtributoAtencion(event.target.value);
    }
    const handlerAtributoZona = (event) => {
        setAtributoZona(event.target.value);
    }


    // , dom legal, atencion, zona


    //presiono el boton buscar
    const buscarConsulta = (opcionBusqueda, textoBusqueda) => {
        // segun el llamado se mostrará
        // console.log("opcion de busqueda: " + opcionBusqueda);
        //console.log("texto de busqueda: " + textoBusqueda);
        
        let resultado = [];
        switch (opcionBusqueda) {
            case 'bd_abog_cuit':
                resultado = baseDatos.filter(registro => registro.bd_abog_cuit === Number(textoBusqueda));
                break;
            case 'bd_abog_nombre':
                resultado = baseDatos.find(registro => registro.bd_abog_nombre === textoBusqueda);
                break;
            default:
                console.log('error en switch case');
                break;
        }
        //console.log(resultado);
        //console.log('longitud: ' + resultado.length);

        // guardo el resultado
        setRegistros(resultado);
        //console.log(registros[0].bd_abog_nombre);


        //configuro para que no se muestren los mensajes
        setResultadoCreate(false);
        setResultadoDelete(false);
        setResultadoQuery(false);
        setResultadoUpdate(false);

        //configuro el resultado para el alta de un abogado
        if (resultado.length === 0 && llamado === 'createAbogado') {
            // alert("crear abogado");
            setMostrarEtiquetasCreate(true);
            setResultadoCreate(false);
        } else {
            if (resultado.length > 0 && llamado === 'createAbogado') {
                setResultadoCreate(true);
                setResultadoUpdate(false);
                setResultadoQuery(false);
                setResultadoDelete(false);
                setMostrarEtiquetasCreate(false);
            }
        }

        //configuro el resultado para la actualizacion de un abogado
        if (resultado.length === 1 && llamado === 'updateAbogado') {
            alert("actualizar abogado");
            setResultadoUpdate(false);
        } else {
            if (resultado.length < 1 && llamado === 'updateAbogado') {
                setResultadoUpdate(true);
                setResultadoCreate(false);
                setResultadoQuery(false);
                setResultadoDelete(false);
                setMostrarEtiquetasCreate(false);
            }
        }


        //configuro el resultado para la consulta de un abogado
        if (resultado.length === 1 && llamado === 'queryAbogado') {
            alert("consulta de abogado");
            setResultadoQuery(false);
        } else {
            if (resultado.length < 1 && llamado === 'queryAbogado') {
                setResultadoCreate(false);
                setResultadoUpdate(false);
                setResultadoQuery(true);
                setResultadoDelete(false);
                setMostrarEtiquetasCreate(false);
            }
        }

        if (resultado.length === 1 && llamado === 'deleteAbogado') {
            alert("borrar el abogado");
            setResultadoDelete(false);
        } else {
            if (resultado.length < 1 && llamado === 'deleteAbogado') {
                setResultadoCreate(false);
                setResultadoDelete(true);
                setResultadoQuery(false);
                setResultadoUpdate(false);
                setMostrarEtiquetasCreate(false);
            }
        }

    }

    return (
        <>
            <section className='caja-busqueda-container'>
                {llamado === 'createAbogado' && 
                    <h1>Módulo de Altas de abogados</h1>
                }
                {llamado === 'queryAbogado' && 
                    <h1>Módulo de Consulta de abogados</h1>
                }
                {llamado === 'updateAbogado' && 
                    <h1>Módulo de Actualización de abogados</h1>
                }
                {llamado === 'deleteAbogado' && 
                    <h1>Módulo de Borrado de abogados</h1>
                }

                <select id='buscarCuitNombre' value={opcionBusqueda} onChange={cambiosOpcionBusqueda}>
                    <option value={''}>Seleccionar....</option>
                    <option value={'bd_abog_cuit'}>Buscar por CUIT</option>
                    <option value={'bd_abog_nombre'}>Buscar por Nombre</option>
                </select>
                <input id='textoBusqueda' value={textoBusqueda} onChange={cambiosTextoBusqueda}/>


                <button onClick={()=>buscarConsulta(opcionBusqueda, textoBusqueda)}>Buscar</button>
            </section>

            {/* renderizado condicional  */}
            {resultadoCreate && <p className='mensaje'>Se encontró un abogado, el registro pertenece a {registros[0].bd_abog_nombre}</p>}
            {resultadoUpdate && <p className='mensaje'>No se encontró un abogado válido para actualizar</p>}
            {resultadoQuery && <p className='mensaje'>No se encontró un abogado válido para la consulta</p>}
            {resultadoDelete && <p className='mensaje'>No se encontró un abogado válido para borrar</p>}

            {mostrarEtiquetasCreate && (
                <form>
                    <section className='seccion'>
                        <article className='nombre articulo'>
                            <label htmlFor='nombreCompleto'>Nombre Completo</label>
                            <input id='nombreCompleto' value={atributoNombre} onChange={handlerAtributoNombre} />
                        </article>
                    </section>
                    <section className='tomofoliocuit seccion'>
                        <article className='tomo articulo'>
                            <label htmlFor='tomos' >Tomo</label>
                            <input id='tomos' value={atributoTomo} onChange={handlerAtributoTomo} />
                        </article>
                        <article className='folio articulo'>
                            <label htmlFor='folios'>Folio</label>
                            <input id='folios' value={atributoFolio} onChange={handlerAtributoFolio} />
                        </article>
                        <article className='cuit articulo'>
                            <label htmlFor='cuits'>Cuit</label>
                            <input id='cuits' value={atributoCuit} onChange={handlerAtributoCuit} />
                        </article>
                    </section>
                    <article className='domreal articulo'>
                        <label htmlFor='domreals'>Domicilio Real</label>
                        <input id='domreals' value={atributoDomReal} onChange={handlerAtributoDomReal} />
                    </article>
                    <section className='telefonocelularcorreo seccion'>
                        <article className='telefono articulo'>
                            <label htmlFor='telefonos'>Teléfono</label>
                            <input id='telefonos' value={atributoTelefono} onChange={handlerAtributoTelefono} />
                        </article>
                        <article  className='celular articulo'>
                            <label htmlFor='celulars'>Celular</label>
                            <input id='celulars' value={atributoCelular} onChange={handlerAtributoCelular} />
                        </article>
                        <article className='correo articulo'>
                            <label htmlFor='emails'>E-Mail</label>
                            <input id='emails' value={atributoEmail} onChange={handlerAtributoEmail} />
                        </article>
                    </section>
                    <article className='domelec articulo'>
                        <label htmlFor='domelecs'>Domicilio Electrónico</label>
                        <input id='domelecs' value={atributoDomElec} onChange={handlerAtributoDomElec} />
                    </article>
                    <section className='asesordefensor seccion'>
                        <article className='asesor articulo'>
                            <label htmlFor='asesors'>Sortear como Asesor</label>
                            <input id='asesors' value={atributoAsesor} onChange={handlerAtributoAsesor} />
                        </article>
                        <article className='defensor articulo'>
                            <label htmlFor='defensors'>Sortear como defensor</label>
                            <input id='defensors' value={atributoDefensor} onChange={handlerAtributoDefensor}/>
                        </article>
                    </section>
                    <article className='domlegal articulo'>
                        <label htmlFor='domlegals'>Domicilio Legal</label>
                        <input id='domlegals' value={atributoDomLegal} onChange={handlerAtributoDomLegal}/>
                    </article>
                    <section className='atencionzona seccion'>
                        <article className='atencion articulo'>
                            <label htmlFor='atencions'>Dias y horario de atención</label>
                            <input id='atencions' value={atributoAtencion} onChange={handlerAtributoAtencion}/>
                        </article>
                        <article className='zona articulo'>
                            <label htmlFor='zonas'>Zona</label>
                            <input id='zonas' value={atributoZona} onChange={handlerAtributoZona} />
                        </article>
                    </section>
                    
                </form>
            )}
        </>
    );

}

export default BuscarAbogado;
