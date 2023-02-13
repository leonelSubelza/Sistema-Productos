import React, { useEffect, useState } from 'react'
import Articulo from './Articulo';
import { cargarObjetos } from "../../../service/GestionProductos";

function Articulos() {
  const [tipoProducto, setTiposProductos] = useState([]);

  const cargarDatosTipoProducto = () => {
    cargarObjetos("tiposProductos")
      .then((response) => {
        setTiposProductos(response);
      })
      .catch(() => {
        setTiposProductos([]);
      });
  }

  useEffect(() => {
    cargarDatosTipoProducto();
  }, []);

  return (
    <div className='articulos'>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="row w-100">
          {
            tipoProducto.map(productos => (
              productos.productos.map(prod => (
                <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={prod.id}>
                  <Articulo imageSource={prod.imagen} nombreProducto={prod.nombre} nombreCategoria={productos.nombre} precio={prod.precio} />
                </div>
              )
              )))
          }
        </div>
      </div>
    </div>
  )
}

export default Articulos
