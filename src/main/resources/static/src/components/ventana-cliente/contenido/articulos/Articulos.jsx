import React, {useContext, useEffect, useState} from "react";
import Articulo from "./Articulo.jsx";
// import Paginacion from "../Paginacion.jsx";
import {administradorCantObjPorTabla, URLImagenes} from '../../../../service/Configuracion.js'
// import { funcionesContext } from "../../../../context/FuncionesTablaContext.jsx";
import "../../../../styles/ventana-cliente/articulos.css";
import {clienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import Paginador from "../../../utils/Paginador.jsx";

window.timestamp = 123456;

function Articulos({ show,tipoProductoAMostrar, handleShowArticulos}) {

  const {productosFiltrados,cargarProductosFiltrados} = useContext(clienteContext);

  const [detallesProdFiltrados, setDetallesProdFiltrados] = useState({})

  // const [paginadorProductosFiltrados, setPaginadorProductosFiltrados] = useState(new Map)

  const [productosMostrar, setProductosMostrar] = useState([])

  const [pagActual, setPagActual] = useState(1)

  const getKeyProductosFiltrados = (id) => {
    return Array.from(productosFiltrados.keys()).find(pf => pf.id === id);
  }

  const existenProductosCargadosParaEstaPagina = (keyProdCard,nroPag) => {
    return productosFiltrados.get(keyProdCard) && productosFiltrados.get(keyProdCard).get(nroPag);
  }

  const handleClickVolver = () => {
/*    let paginadorProdAux = new Map;
    setPaginadorProductosFiltrados(paginadorProdAux);*/
    setProductosMostrar([]);
    return handleShowArticulos();
  }

  const actualizarPaginadorProductosFiltrados = (nroPagina) => {
    // console.log("se pide pag: "+nroPagina)
    let keyProdCard = getKeyProductosFiltrados(tipoProductoAMostrar.id);
    if(!keyProdCard) return;
    let nroPaginaAux = nroPagina;
    if(nroPagina>=1){
      nroPagina=nroPagina-1;
    }else{
      nroPagina=0;
    }
    // console.log("pag que se va a pedir en la req: "+nroPagina)
    if(!existenProductosCargadosParaEstaPagina(keyProdCard,nroPagina)){
      cargarProductosFiltrados(nroPagina,tipoProductoAMostrar.id)
        .then(res => {
          // console.log("no habia prod cargados, se hace request")
          // console.log(res)

/*          let productosCargados = res.get(nroPagina);
          paginadorProductosFiltrados.set(nroPagina,productosCargados)
          setPaginadorProductosFiltrados(new Map(paginadorProductosFiltrados))*/
          setProductosMostrar(res.get(nroPagina));
/*          console.log("paginadorProductosFIltrados:")
          console.log(paginadorProductosFiltrados)*/
      })
    }else{
      // console.log("habia prod ya cargados, se cargan:")
/*      let productosCargados = productosFiltrados.get(keyProdCard);
      paginadorProductosFiltrados.set(nroPagina,productosCargados)
      setPaginadorProductosFiltrados(new Map(paginadorProductosFiltrados))*/
      let productosCargados = productosFiltrados.get(keyProdCard);
      console.log(productosCargados.get(nroPagina))
      setProductosMostrar(productosCargados.get(nroPagina));
    }
    setPagActual(nroPaginaAux);
  }

  useEffect(() => {
    // if(!tipoProductoAMostrar) return;
    if(show){
      let keyProdCard = getKeyProductosFiltrados(tipoProductoAMostrar.id);
      actualizarPaginadorProductosFiltrados(1);
      setDetallesProdFiltrados(keyProdCard);
      // console.log(keyProdCard)
    }
  },[show]);

  return (
    <>
      <div className={`articulos ${show&&'show'}`}>
        <button onClick={handleClickVolver}>volver</button>
{/*        {paginadorProductosFiltrados &&
        paginadorProductosFiltrados.get(pagActual) &&
        paginadorProductosFiltrados.get(pagActual).length !== 0 ?
          paginadorProductosFiltrados.get(pagActual)*/}
        {productosMostrar &&
        productosMostrar.length !== 0 ?
          productosMostrar
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
        <Paginador
          setPaginaAnterior={actualizarPaginadorProductosFiltrados}
          setPaginaSiguiente={actualizarPaginadorProductosFiltrados}
          setPaginaActual={actualizarPaginadorProductosFiltrados}
          numeroTotalDePaginas={detallesProdFiltrados.totalPaginas}
          paginaActual={pagActual}
          show={ ((detallesProdFiltrados.totalPaginas > 0) && show) }
        />
          </div>

    </>
  );
}

export default Articulos;
/*
{productosFiltrados.get(detallesProdFiltrados) &&
productosFiltrados.get(detallesProdFiltrados).get(pagActual) &&
productosFiltrados.get(detallesProdFiltrados).get(pagActual).length !== 0 ?
  productosFiltrados.get(detallesProdFiltrados).get(pagActual)*/
