import React, { useEffect, useState } from 'react'
import Articulo from './Articulo';
import { cargarObjetos } from "../../../service/GestionProductos";
import Paginacion from './Paginacion';

function Articulos() {
  const [tipoProducto, setTipoProductos] = useState([]);
  const [productos, setproductos] = useState([]);
  const totalProductos = productos.length;

  const [productosPorPagina] = useState(4);
  const [paginaActual, setpaginaActual] = useState(1);

  const ultimoIndex = paginaActual * productosPorPagina; // 2 * 4 = 8
  const primerIndex = ultimoIndex - productosPorPagina; // 8 - 4 = 4

  const cargarTipoProductosLista = () => {
    cargarObjetos("tiposProductos")
      .then((response) => {
        setTipoProductos(response);
      })
      .catch(() => {
        setTipoProductos([]);
      });
  }
  const cargarProductosLista = () => {
    cargarObjetos("productos")
      .then((response) => {
        setproductos(response);
      })
      .catch(() => {
        setproductos([]);
      });
  }

  useEffect(() => {
    cargarTipoProductosLista();
    cargarProductosLista();
  }, []);
  console.log(tipoProducto)
  return (
    <>
      <div className='articulos'>
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row w-100">
            {
              productos.map(prod => (
                <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={prod.id}>
                  <Articulo imageSource={prod.imagen} nombreProducto={prod.nombre} nombreCategoria={prod.descripcion} precio={prod.precio} />
                </div>
              )).slice(primerIndex, ultimoIndex)


              // tipoProducto.map(productos => (
              //   productos.productos.map(prod => (
              //     <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={prod.id}>
              //       <Articulo imageSource={prod.imagen} nombreProducto={prod.nombre} nombreCategoria={productos.nombre} precio={prod.precio} />
              //     </div>
              //   ))).slice(primerIndex, ultimoIndex))
            }
          </div>
        </div>
      </div>
      <Paginacion productosPorPagina={productosPorPagina} paginaActual={paginaActual} setpaginaActual={setpaginaActual} totalProductos={totalProductos} />
    </>
  )
}

export default Articulos
