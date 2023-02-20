import React from 'react';
import Filtro from './Filtro';
import Articulos from './Articulos';
import '../../../styles/ventana-cliente/contenido.css';

const Contenido = ({productos,productosMostrados,setProductosMostrados,tiposProductos,totalProductos,settotalProductos,productosPorPagina,paginaActual,setPaginaActual}) => {
  return (
    <section className='section'>
      <Filtro
        productos={productos}
        setProductosMostrados={setProductosMostrados}
        tiposProductos={tiposProductos}
        settotalProductos={settotalProductos}
        setPaginaActual={setPaginaActual}
      />
      <Articulos
        productosMostrados={productosMostrados}
        totalProductos={totalProductos}
        productosPorPagina={productosPorPagina}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
      />
    </section>
  );
}

export default Contenido;