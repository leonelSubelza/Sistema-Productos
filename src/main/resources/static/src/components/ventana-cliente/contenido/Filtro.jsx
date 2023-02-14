import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Filtro = () => {
  return (
    < div className='filtro'>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Buscar</Button>
      </Form>
    </div>
  );
}

export default Filtro;