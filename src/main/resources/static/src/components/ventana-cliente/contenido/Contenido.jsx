import React from 'react';
import Filtro from './Filtro';
import Articulos from './Articulos';
import Paginacion from './Paginacion';
import '../../../styles/ventana-cliente/contenido.css';

const Contenido = () => {
  return (
    <section className='section'>
      <Filtro />
      <Articulos />
      <Paginacion />


    </section>
  );
}

export default Contenido;