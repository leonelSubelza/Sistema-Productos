import React from 'react';
import Filtro from './Filtro';
import Articulos from './Articulos';
import '../../../styles/ventana-cliente/contenido.css';

const Contenido = () => {
  return (
    <section className='section'>
      <Filtro />
      <Articulos />
    </section>
  );
}

export default Contenido;