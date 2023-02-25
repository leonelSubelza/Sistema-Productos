import React from "react";
import Articulo from "./Articulo";
import Paginacion from "./Paginacion";
import {URLImagenes} from '../../../service/Configuracion'

window.timestamp = 123456;

function Articulos({productosMostrados,totalProductos,productosPorPagina,paginaActual,setPaginaActual}) {

  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;

  return (
    <>
      <div className="articulos">
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row w-100">
            {productosMostrados &&
              productosMostrados
                .map((prod) => (
                  <div className="col-md-3 col-sm-6 col-xs-6 p-1" key={prod.id}>
                    <Articulo                      
                      imageSource={
                        prod.imagen !== null ?
                        `${URLImagenes}${prod.imagen}?timestamp=${window.timestamp}`
                        : ''
                      }
                      nombreProducto={prod.nombre}
                      nombreCategoria={prod.tipoProducto.nombre}
                      precio={prod.precio}
                    />
                  </div>
                ))
                .slice(primerIndex, ultimoIndex)}
          </div>
        </div>
      </div>
      <Paginacion
        productosPorPagina={productosPorPagina}
        paginaActual={paginaActual}
        setpaginaActual={setPaginaActual}
        totalProductos={totalProductos}
      />
    </>
  );
}

export default Articulos;
