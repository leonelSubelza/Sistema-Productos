import React, { useContext } from "react";
import Articulo from "./Articulo";
import Paginacion from "./Paginacion";
import { URLImagenes } from '../../../service/Configuracion'
import { funcionesContext } from "../../../context/FuncionesTablaContext";
import "../../../styles/ventana-cliente/articulos.css";

window.timestamp = 123456;

function Articulos({ productosMostrados, totalProductos, productosPorPagina, paginaActual, setPaginaActual }) {

  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;
  const { productos } =
    useContext(funcionesContext);
//console.log(productos);
  return (
    <>
      <div className="articulos">
            {(totalProductos) !== 0 ? productosMostrados &&
              productosMostrados
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
                )).slice(primerIndex, ultimoIndex) : <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>}
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
