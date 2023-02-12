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

        {/* <div className="card text-center bg-dark">
          <div className="overflow">
            <img src="https://random.imagecdn.app/100/100" alt="a wallpaper" className="card-img-top" />
          </div>
          <div className="card-body text-light">
            <h4 className="card-title">Titulo Tarjeta</h4>
            <p className="card-text text-secondary">
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."
            </p>
            <a href="#!" target="_blank" className="btn btn-outline-secondary border-0" rel="noreferrer"> Go to </a>
          </div>
        </div> */}


        <Navegacion />

      </div>
    </section>
  );
}

export default Contenido;