import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Buscador = ({setBusquedaARealizar}) => {

  const [busqueda, setBusqueda] = useState('');   

  const filtrar = () => {
/*    setProductosMostrados(productos)
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    setProductosMostrados(productosFiltrados)*/
    return setBusquedaARealizar(busqueda);
  }

  const handleInputChange = (event) => {
    // actualiza el estado 'busqueda' cada vez que se escriba algo en el campo de búsqueda
    setBusqueda(event.target.value);
  };

  return (
    < div className='filtro'>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
          value={busqueda}
          onChange={handleInputChange} // actualiza el estado cada vez que se escribe algo
        />
        <Button onClick={filtrar} variant="outline-success">Buscar</Button>
      </Form>
    </div>
  );
}

export default Buscador;