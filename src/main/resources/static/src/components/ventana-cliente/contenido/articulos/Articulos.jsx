import React, { useContext } from "react";
import Articulo from "./Articulo.jsx";
import Paginacion from "../Paginacion.jsx";
import { URLImagenes } from '../../../../service/Configuracion.js'
import { funcionesContext } from "../../../../context/FuncionesTablaContext.jsx";
import "../../../../styles/ventana-cliente/articulos.css";

window.timestamp = 123456;

function Articulos({ show,productosMostrados}) {

/*  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;
  const { productos } =
    useContext(funcionesContext);*/
//console.log(productos);
  return (
    <>
      <div className={`articulos ${show&&'show'}`}>
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
                ))
              :
              <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>
        }
          </div>

    </>
  );
}

export default Articulos;
