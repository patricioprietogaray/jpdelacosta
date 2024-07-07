import React, { useState } from 'react';
import '../../css/PrincipalBarraTitulo.css';
import axios from 'axios';


const FormAbogSorteo = ({ cerrarVentanaAgregarDesdeGeneral }) => {
    
    const host = "192.168.18.100";

    const [abogadoSorteado, setAbogadoSorteado] = useState();
    //const [abogadoSorteado, setAbogadoSorteado] = useState('Dr. Equis');

    const handlerVolverClic = () => {
        cerrarVentanaAgregarDesdeGeneral();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert('cargar un sorteo');
        sorteo();
    }

    const sorteo = async () => {
        try {
            // Realizar la solicitud GET al endpoint del backend que realiza el sorteo
            //const response = await axios.get('/ruta/al/endpoint/de/sorteo');
            const response = await axios.get(`http://${host}:${process.env.REACT_APP_NODE_PORT || 3001}/abogados/sorteo/`);
            
            // Obtener los datos del abogado sorteado de la respuesta del backend
            const abogadoSorteadoData = response.data.abogado_aleatorio;

            // Actualizar el estado con los datos del abogado sorteado
            setAbogadoSorteado(`${abogadoSorteadoData.bd_abog_nombre}, CUIT: ${abogadoSorteadoData.bd_abog_cuit}`);

        } catch (error) {
            console.error('Error al realizar el sorteo:', error);
            // Puedes manejar el error aquí
        }
    }

    return (
        <div className='ventanaEmergente'>
            <section className='barraTitulo'>
                <h4>Sorteo de abogado para un expediente</h4>
                <article className='close-button' onClick={handlerVolverClic}></article>
            </section>
            <form onSubmit={handleSubmit}>
                <section className='seccionDisplayFlex'>
                    <div>
                        <label>Abogado seleccionado: </label>
                        <label>{abogadoSorteado}</label>
                    </div>
                </section>
                <button type="submit">Realizar Sorteo</button>
            </form>
        </div>
    )
}

export default FormAbogSorteo