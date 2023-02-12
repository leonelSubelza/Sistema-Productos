import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Filtro = () => {
  return (
    // <div className='buscado-lupa-juntos'>
    //   <input className='filtro-input' type="text" placeholder='Buscar' />
    //   <button className='filtro-lupa'><i className="bi bi-search"></i></button>
    // </div>
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Buscar</Button>
      </Form>
    </>
  );
}

export default Filtro;