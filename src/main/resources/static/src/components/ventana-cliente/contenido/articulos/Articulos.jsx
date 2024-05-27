import React, {useContext, useEffect, useState} from "react";
import Articulo from "./Articulo.jsx";
// import Paginacion from "../Paginacion.jsx";
import { MdKeyboardBackspace } from "react-icons/md";
import {URLImagenes} from '../../../../service/Configuracion.js'
// import { funcionesContext } from "../../../../context/FuncionesTablaContext.jsx";
import "../../../../styles/ventana-cliente/articulos.css";
import {clienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import Paginador from "../../../utils/Paginador.jsx";
import Filtro from "./filtro/Filtro.jsx";
import Buscador from "./buscador/Buscador.jsx";
import {funcionesContext} from "../../../../context/FuncionesTablaContext.jsx";

window.timestamp = 123456;

function Articulos({ show,tipoProductoAMostrar, handleShowArticulos}) {

  const {productosFiltrados,cargarProductosFiltrados,cargarProductosPorCampoYTipoProducto} = useContext(clienteContext);

  const {cargarTipoProductoAProductos,tiposProductos} = useContext(funcionesContext);

  const [detallesProdFiltrados, setDetallesProdFiltrados] = useState({})

  // const [paginadorProductosFiltrados, setPaginadorProductosFiltrados] = useState(new Map)

  const [productosMostrar, setProductosMostrar] = useState([])

  const [productosCargados, setProductosCargados] = useState()

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
          setProductosMostrar(res.get(nroPagina));

          setProductosCargados(res.get(nroPagina))
      })
    }else{
      let productosCargados = productosFiltrados.get(keyProdCard);
      setProductosMostrar(productosCargados.get(nroPagina));

      setProductosCargados(productosCargados.get(nroPagina))
    }
    setPagActual(nroPaginaAux);
  }

  const handleProductosMostrar = (productosMostrarFiltrados) => {
    //si es undefined es porque se borro el filtro
    if(productosMostrarFiltrados){
      setProductosMostrar(productosMostrarFiltrados)
    }else{
      actualizarPaginadorProductosFiltrados(pagActual);
    }
  }

  const handleBusquedaARealizar = (value) => {
    let nroPaginaAux = pagActual;
    if(nroPaginaAux>=1){
      nroPaginaAux=nroPaginaAux-1;
    }else{
      nroPaginaAux=0;
    }

    if(value===''){
      //limpiar busqueda
      console.log("limpia la busqueda")
      let keyProdCard = Array.from(productosFiltrados.keys()).find(k => k.id === tipoProductoAMostrar.id);

      console.log("key a buscar:")
      console.log(keyProdCard)
      let productosCompletos = productosFiltrados.get(keyProdCard).get(nroPaginaAux);
      console.log("productos AMOstrar")
      console.log(productosCompletos);


      detallesProdFiltrados.totalPaginas = keyProdCard.totalPaginas;
      setDetallesProdFiltrados(detallesProdFiltrados);

      console.log("detalles cambiados:")
      console.log(detallesProdFiltrados)
      setProductosMostrar(productosCompletos);

    }else{
      //realizar busqueda
      cargarProductosPorCampoYTipoProducto("productos/byProductTypeAndNombre","nombre",value,
        nroPaginaAux,detallesProdFiltrados.id)
        .then(res => {
          console.log("response:")
          console.log(res.content)
          //Actualizamos a detalles el total De paginas
          let detallesProductosFiltrados = detallesProdFiltrados;
          detallesProductosFiltrados.totalPaginas = res.totalPages;
          setDetallesProdFiltrados(detallesProductosFiltrados)

          //Cargamos los productos con su tipoProducto obj
          let productosCompletos = cargarTipoProductoAProductos(res.content,tiposProductos)
          setProductosMostrar(productosCompletos);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if(show){
      let keyProdCard = getKeyProductosFiltrados(tipoProductoAMostrar.id);
      actualizarPaginadorProductosFiltrados(1);
      setDetallesProdFiltrados(keyProdCard);
    }
  },[show]);

  return (
    <>
      <div className={`articulos ${show&&'show'}`}>
        <Filtro
          productos={productosCargados}
          setProductosMostrados = {handleProductosMostrar}
          nombreCategoria={detallesProdFiltrados.nombre}
        />
        <Buscador
          setBusquedaARealizar={handleBusquedaARealizar}
        />
        <div className={'articulos-btn-container'}>
          <button onClick={handleClickVolver}><MdKeyboardBackspace /> Volver
          </button>
        </div>
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
          color={"#6ba488"}
        />
          </div>

    </>
  );
}

export default Articulos;
