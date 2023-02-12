import React from 'react';

const Articulo = (props) => {
  return (
    <article className="articulo">
      <img className='articulo-img' src={props.url} alt="img" />
      <p className='articulo-nombre-producto'>{props.nombreProducto}</p>
      <p className='articulo-nombre-categoria'>{props.nombreCategoria}</p>
      <p className='articulo-precio'>{props.precio}</p>
    </article>
  );
}

export default Articulo;