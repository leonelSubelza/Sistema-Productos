import React, {useContext, useEffect, useState} from "react";
import Articulo from "./Articulo.jsx";
// import Paginacion from "../Paginacion.jsx";
import { URLImagenes } from '../../../../service/Configuracion.js'
// import { funcionesContext } from "../../../../context/FuncionesTablaContext.jsx";
import "../../../../styles/ventana-cliente/articulos.css";
import {clienteContext} from "../../../../context/FuncionesClienteContext.jsx";

window.timestamp = 123456;

function Articulos({ show,tipoProductoAMostrar, handleShowArticulos}) {

  const {productosFiltrados,cargarProductosFiltrados} = useContext(clienteContext);

  const [detallesProdFiltrados, setDetallesProdFiltrados] = useState({})

  // const [paginadorProductosFiltrados, setPaginadorProductosFiltrados] = useState(new Map)

  const [pagActual, setPagActual] = useState(0)

  const getKeyProductosFiltrados = (id) => {
    return Array.from(productosFiltrados.keys()).find(pf => pf.id === id);
  }

  const existenProductosCargadosParaEstaPagina = (keyProdCard) => {
    return productosFiltrados.get(keyProdCard) && productosFiltrados.get(keyProdCard).get(pagActual);
  }

  const handleClickVolver = () => {
    // let paginadorProdAux = new Map;
    // setPaginadorProductosFiltrados(paginadorProdAux);
    return handleShowArticulos();
  }

  useEffect(() => {
    if(!tipoProductoAMostrar) return;
    if(show){
      let keyProdCard = getKeyProductosFiltrados(tipoProductoAMostrar.id);
      if(!keyProdCard) return;
      if(!existenProductosCargadosParaEstaPagina(keyProdCard)){
        cargarProductosFiltrados(pagActual,tipoProductoAMostrar.id)
      }
      setDetallesProdFiltrados(keyProdCard);
    }
  });

  return (
    <>
      <button onClick={handleClickVolver}>volver</button>
      <div className={`articulos ${show&&'show'}`}>
        {productosFiltrados.get(detallesProdFiltrados) &&
          productosFiltrados.get(detallesProdFiltrados).get(pagActual) &&
        productosFiltrados.get(detallesProdFiltrados).get(pagActual).length !== 0 ?
          productosFiltrados.get(detallesProdFiltrados).get(pagActual)
                .map((prod, index) => (
                    <Articulo key={index}
                      imageSource={
                        prod.imagen === 'null' ?
                          ''
                          : `${URLImagenes}${prod.imagen}?timestamp=${new Date().getTime()}`
                      }
                      nombreProducto={prod.nombre}
                      nombreCategoria={prod.tipoProducto.nombre}
                      precio={prod.precio}
                      producto={prod}
                    />
                ))
              :
              <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>
        }
          </div>

    </>
  );
}

export default Articulos;
