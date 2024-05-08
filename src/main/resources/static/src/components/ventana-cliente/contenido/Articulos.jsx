import React, { useContext } from "react";
import Articulo from "./Articulo";
import Paginacion from "./Paginacion";
import { URLImagenes } from '../../../service/Configuracion'
import { funcionesContext } from "../../../context/FuncionesTablaContext";

window.timestamp = 123456;

function Articulos({ productosMostrados, totalProductos, productosPorPagina, paginaActual, setPaginaActual }) {

  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;
  const { productos } =
    useContext(funcionesContext);

  return (
    <>
      <div className="articulos">
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row w-100">
            {(totalProductos) !== 0 ? productosMostrados &&
              productosMostrados
                .map((prod, index) => (
                  <div className="col-md-3 col-sm-6 col-xs-6 p-1 card" key={prod.id}>
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
                  </div>
                )).slice(primerIndex, ultimoIndex) : <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>}
          </div>
        </div>
      </div>
      {(totalProductos !== 0) ? <Paginacion
        productosPorPagina={productosPorPagina}
        paginaActual={paginaActual}
        setpaginaActual={setPaginaActual}
        totalProductos={totalProductos}
      /> : ""}

    </>
  );
}

export default Articulos;