import React from 'react'
import Articulo from './Articulo';

const articulos = [
  {
    id: 1,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$3423",
  },
  {
    id: 2,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$2323",
  },
  {
    id: 3,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
  {
    id: 4,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
  {
    id: 5,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
  {
    id: 6,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
  {
    id: 7,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
  {
    id: 8,
    image: "https://random.imagecdn.app/200/200",
    nombreProducto: "Nombre Producto",
    nombreCategoria: "Nombre Categoria",
    precio: "$323",
  },
];

function Articulos() {
  return (
    <div className='articulos'>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row">
          {articulos.map(({ id, image, nombreProducto, nombreCategoria, precio }) => (
            <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={id}>
              <Articulo imageSource={image} nombreProducto={nombreProducto} nombreCategoria={nombreCategoria} precio={precio} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Articulos
