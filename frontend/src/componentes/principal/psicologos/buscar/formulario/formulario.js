import React, { useState } from 'react';

const Formulario = () => {

    const [atributo, setAtributo] = useState('');
    const [textoBusqueda, setTextoBusqueda] = useState('');
    const [resultado, setResultado] = useState(false);

    
    
    const handleChange = (event) => {
        setAtributo(event.target.value);
    }

    const textoAbuscar = (event) => {
        setTextoBusqueda(event.target.value);
    }

    const busqueda = (e) => {
        alert("el atributo es: " + atributo +', texto a buscar: '+textoBusqueda);
        setResultado(true);
        //para que el form no se actualice
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={busqueda}>
                <label>Buscar por .... </label>
                <select onChange={handleChange}>
                    <option value=''>Buscar por ....</option>
                    <option value='bd_abog_cuit'>CUIT</option>
                    <option value='bd_abog_nombre'>NOMBRE</option>
                </select>
                <input onChange={textoAbuscar}/>
                <button type='submit'>Buscar</button>
            </form>
            {resultado && (
                <p>Hubo un resultado positivo!</p>
            )}
        </>
        
    );
}

export default Formulario;
