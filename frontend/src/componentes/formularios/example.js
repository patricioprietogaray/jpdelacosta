import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CRUDExample = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    bd_abog_cuit: '',
    bd_abog_nombre: '',
    bd_abog_tomo: '',
    bd_abog_folio: '',
    bd_abog_asesor: false,
    bd_abog_defensor: false,
    bd_abog_domicilio_electronico: '',
    bd_abog_email: '',
    bd_abog_horario_atencion: '',
    bd_abog_domicilio_real: '',
    bd_abog_celular: '',
    bd_abog_telefono_fijo: '',
    bd_abog_zona: '',
    bd_abog_domicilio_legal: '',
    bd_abog_usuario_mev: ''
  });
  const [editedItem, setEditedItem] = useState(null);

  // Función para cargar los datos al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para obtener los datos de la colección MongoDB
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/abogados/todos');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Función para agregar un nuevo elemento a la colección
  const addItem = async () => {
    try {
      await axios.post('http://localhost:3001/abogados/crear', newItem);
      setNewItem({
        bd_abog_cuit: '',
        bd_abog_nombre: '',
        bd_abog_tomo: '',
        bd_abog_folio: '',
        bd_abog_asesor: false,
        bd_abog_defensor: false,
        bd_abog_domicilio_electronico: '',
        bd_abog_email: '',
        bd_abog_horario_atencion: '',
        bd_abog_domicilio_real: '',
        bd_abog_celular: '',
        bd_abog_telefono_fijo: '',
        bd_abog_zona: '',
        bd_abog_domicilio_legal: '',
        bd_abog_usuario_mev: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error al agregar elemento:', error);
    }
  };

  // Función para actualizar un elemento de la colección
  const editItem = async () => {
    try {
      await axios.put(`http://localhost:3001/abogados/actualizar/${editedItem._id}`, editedItem);
      setEditedItem(null);
      fetchData();
    } catch (error) {
      console.error('Error al actualizar elemento:', error);
    }
  };

  // Función para eliminar un elemento de la colección
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/abogados/borrar/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar elemento:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Example</h1>
      <input
        type="text"
        value={newItem.bd_abog_nombre}
        onChange={(e) => setNewItem({ ...newItem, bd_abog_nombre: e.target.value })}
        placeholder="Nombre del nuevo elemento"
      />
      <button onClick={addItem}>Agregar</button>

      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.bd_abog_nombre}
            <button onClick={() => setEditedItem(item)}>Editar</button>
            <button onClick={() => deleteItem(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {editedItem && (
        <div>
          <input
            type="text"
            value={editedItem.bd_abog_nombre}
            onChange={(e) => setEditedItem({ ...editedItem, bd_abog_nombre: e.target.value })}
          />
          <button onClick={editItem}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default CRUDExample;