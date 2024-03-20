// leer, actualizar y borrar registro
// crudUpdate.js

import React from 'react';

const crudUpdate = ({registro}) => {
    return (
        <div className='abogadoLectura'>
            <h4>Apellido y Nombre: {registro.bd_abog_nombre} </h4>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Nombres y Apellidos: </label>
                    <input className='anchoGrande espaciado' value={registro.bd_abog_nombre} readOnly disabled />
                </div>
                <div>
                    <label>Tomo: </label>
                    <input className='anchoChico textoDerecha espaciado' value={registro.bd_abog_tomo} readOnly disabled />
                </div>
                <div>
                    <label>Folio: </label>
                    <input className='anchoChico textoDerecha espaciado' value={registro.bd_abog_folio} readOnly disabled />
                </div>
                <div>
                    <label>C.U.I.T.: </label>
                    <input className='anchoMediano espaciado' value={registro.bd_abog_cuit} readOnly disabled />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Real: </label>
                    <input className='anchoGrandisimo espaciado' value={registro.bd_abog_domicilio_real} readOnly disabled />
                </div>
                <div>
                    <label>Teléfono Fijo: </label>
                    <input className='anchoMediano espaciado' value={registro.bd_abog_telefono_fijo} readOnly disabled />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Celular: </label>
                    <input className='anchoMediano espaciado' value={registro.bd_abog_celular} readOnly disabled />
                </div>
                <div>
                    <label>E - Mail: </label>
                    <input className='anchoGrande espaciado' value={registro.bd_abog_email} readOnly disabled />
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domiclio Electrónico: </label>
                    <input className='anchoGrande espaciado' value={registro.bd_abog_domicilio_electronico} readOnly disabled />
                </div>
                <div>
                    <label>Asesor: </label>
                    <select className='anchoChicoOpcion espaciado' value={registro.bd_abog_asesor} disabled>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> 
                <div>
                    <label>Defensor: </label>
                    <select className='anchoChicoOpcion espaciado' value={registro.bd_abog_defensor} disabled>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> 
            </section>            
            <section className='seccionDisplayFlex'>
                <div>
                    <label>Domicilio Legal: </label>
                    <input className='anchoGrandisimo espaciado' value={registro.bd_abog_domicilio_legal} readOnly disabled />
                </div>
                <div>
                    <label>Zona de Sorteo: </label>
                    <select disabled>
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div>
            </section>
            <section className='seccionDisplayFlex'>
                 <div>
                    <label>Horario de Atención: </label>
                    <input className='anchoGrandisimo' value={registro.bd_abog_horario_atencion} readOnly disabled />
                </div>
                <div>
                    <label>Usuario M.E.V.: </label>
                    <input className='anchoMediano' value={registro.bd_abog_usuario_mev} readOnly disabled />
                </div>
                {/* <div>
                    <label>Zona de Sorteo: </label>
                    <select disabled>
                        <option value='norte'>Zona Norte (San Clemente del Tuyú)</option>
                        <option value='centro'>Zona Centro (Las Toninas - Costa del Este)</option>
                        <option value='sur'>Zona Sur (Aguas Verdes - Costa Esmeralda)</option>
                    </select>
                </div> */}
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Domicilio electrónico: </label>
                    <input id='domElec' value={registro.bd_abog_domicilio_electronico} readOnly disabled />
                </div> */}
                {/* <div>
                    <label>Celular: </label>
                    <input value={registro.bd_abog_celular} readOnly disabled />
                </div> */}
                {/* <div>
                    <label>Usuario MEV: </label>
                    <input value={registro.bd_abog_usuario_mev} readOnly disabled />
                </div> */}
            </section>
            <section className='seccionDisplayFlex'>
                {/* <div>
                    <label>Usuario MEV: </label>
                    <input value={registro.bd_abog_usuario_mev} readOnly disabled />
                </div> */}
                {/* <div>
                    <label>Defensor: </label>
                    <select disabled>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> */}
                {/* <div>
                    <label>Asesor: </label>
                    <select disabled>
                        <option value='true'>SI</option>
                        <option value='false'>NO</option>
                    </select>
                </div> */}
            </section>
            <div>
                <button>Actualizar</button>
                <button>Borrar</button>
                <button>Volver</button>
            </div>            
        </div>
    );
}

export default crudUpdate;