import React, { useEffect, useState } from 'react'
import Articulo from './Articulo';
import Paginacion from './Paginacion';
import { funcionesContext } from '../../../context/FuncionesTablaContext';
import { useContext } from 'react';


function Articulos() {
  const { actualizarTablaGenerica, borrarProductoGenerico } =
    useContext(funcionesContext);
  const [productos, setProductos] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);
  const [listaProductos] = useState([]);
  const [totalProductos, settotalProductos] = useState(listaProductos.length);
  const [productosPorPagina] = useState(8);
  const [paginaActual, setPaginaActual] = useState(1);
  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;

  const cargarValores = (productosBD) => {
    let productosPiolas = [];
    let tiposProductos = [];
    productosBD.forEach((tipoProd) => {
      let tipoProductoObj = {
        id: tipoProd.id,
        nombre: tipoProd.nombre,
      };
      tipoProd.productos.forEach((prod) => {
        prod.tipoProducto = tipoProductoObj;
        productosPiolas.push(prod);
      });

      tiposProductos.push(tipoProductoObj);
    });
    setTiposProductos(tiposProductos);
    setProductos(productosPiolas);

    setPaginaActual(1);
    settotalProductos(productosPiolas.length)
  };


  useEffect(() => {
    actualizarTablaGenerica("tiposProductos").then((res) => {
      cargarValores(res);
    });
  }, [actualizarTablaGenerica]);

  return (
    <>
      <div className='articulos'>
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row w-100">
            {
              productos &&
              productos.map(prod => (
                <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={prod.id}>
                  <Articulo imageSource={prod.imagen} nombreProducto={prod.nombre} nombreCategoria={prod.tipoProducto.nombre} precio={prod.precio} />
                </div>
              )).slice(primerIndex, ultimoIndex)
            }
          </div>
        </div>
      </div>
      <Paginacion productosPorPagina={productosPorPagina} paginaActual={paginaActual} setpaginaActual={setPaginaActual} totalProductos={totalProductos} />
    </>
  )
}

export default Articulos
