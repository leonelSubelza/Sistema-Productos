import React from 'react';
import Articulo from './Articulo';
import Filtro from './Filtro';
import Navegacion from './Navegacion';
import '../../../styles/contenido.css';

const Contenido = () => {
  return (
    <section className='section'>
      <div className='filtro'>
        <Filtro />
      </div>
      <div className='articulos'>

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />
        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Articulo
          url='https://random.imagecdn.app/100/100'
          alt=''
          nombreProducto='Nombre Producto'
          nombreCategoria='Nombre Categoria'
          precio='$599'
        />

        <Navegacion />

      </div>
    </section>
  );
}

export default Contenido;