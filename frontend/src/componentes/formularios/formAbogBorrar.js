//formAbogBorrar,js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrarAbogado = () => {
    const [abogados, setAbogados] = useState([]);
    const [abogadoSeleccionado, setAbogadoSeleccionado] = useState('');
    const [mensajeParaMostrar, setMensajeParaMostrar] = useState('');
    const [errorParaMostrar, setErrorParaMostrar] = useState('');

    // Función para cargar la lista de abogados desde el servidor
    const cargarAbogados = async () => {
        try {
            const response = await axios.get('http://localhost:3001/abogados');
            setAbogados(response.data);
        } catch (error) {
            console.error('Error al cargar la lista de abogados:', error);
        }
    };

    useEffect(() => {
        cargarAbogados();
    }, []);

    // Manejar el cambio en la selección del abogado
    const handleSeleccionAbogado = (event) => {
        setAbogadoSeleccionado(event.target.value);
    };

    // Manejar la solicitud de borrado del abogado
    const handleBorrarAbogado = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/abogados/${abogadoSeleccionado}`);
            setMensajeParaMostrar(response.data.msg);
            setErrorParaMostrar('');
            cargarAbogados(); // Recargar la lista de abogados después de borrar
        } catch (error) {
            setMensajeParaMostrar('');
            setErrorParaMostrar('Error al borrar el abogado: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Borrar Abogado</h2>
            <select value={abogadoSeleccionado} onChange={handleSeleccionAbogado}>
                <option value="">Seleccione un abogado</option>
                {abogados.map(abogado => (
                    <option key={abogado.id} value={abogado.id}>
                        {abogado.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleBorrarAbogado}>Borrar</button>
            {mensajeParaMostrar && <p>{mensajeParaMostrar}</p>}
            {errorParaMostrar && <p>{errorParaMostrar}</p>}
        </div>
    );
};

export default BorrarAbogado;
