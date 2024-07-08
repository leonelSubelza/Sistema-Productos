import React, {useEffect, useState} from "react";
import Articulo from "./Articulo.jsx";
// import Paginacion from "../Paginacion.jsx";
import { MdKeyboardBackspace } from "react-icons/md";
import {CLIENT_CANT_OBJ_TO_SHOW, IMAGES_URL} from '../../../../service/Configuracion.js'
// import { funcionesContext } from "../../../../context/FuncionesTablaContext.jsx";
import "../../../../styles/ventana-cliente/articulos.css";
import Paginador from "../../../utils/Paginador.jsx";
import Filtro from "./filtro/Filtro.jsx";
import Buscador from "./buscador/Buscador.jsx";
import Spinner from 'react-bootstrap/Spinner';
import {useEntityLoaderFunction} from "../../../../hooks/useEntityLoaderFunction.js";
import {useSelector} from "react-redux";


window.timestamp = 123456;

function Articulos({ show,tipoProductoAMostrar, handleShowArticulos}) {

/*  const {productosFiltrados,cargarProductosFiltrados,cargarProductosPorCampoYTipoProducto} = useContext(clienteContext);

  const {cargarTipoProductoAProductos,tiposProductos} = useContext(funcionesContext);

  //sacar, se tiene esto dentro del obj que devuelve el filteredProductsByType
  const [detallesProdFiltrados, setDetallesProdFiltrados] = useState({})

  // const [paginadorProductosFiltrados, setPaginadorProductosFiltrados] = useState(new Map)

  //Productos que se mostraran
  const [productosMostrar, setProductosMostrar] = useState([])

  const [productosCargados, setProductosCargados] = useState()

  const [valorFiltro, setValorFiltro] = useState('');*/

  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const [pagActual, setPagActual] = useState(1)

  const tiposProductos = useSelector(store => store.productsType.value);
  // const {tiposProductos} = useContext(funcionesContext);

  // const filteredProducts = useSelector(store => store.filteredProducts);
  const [pageToShow, setPageToShow] = useState({})
  const [productsToShow, setProductsToShow] = useState([]);
  const [valorBuscador, setValorBuscador] = useState('');
  const [valorGenero, setValorGenero] = useState('');

  const { cargarPaginaProductosFiltrados } = useEntityLoaderFunction();


  const handleClickVolver = () => {
/*    let paginadorProdAux = new Map;
    setPaginadorProductosFiltrados(paginadorProdAux);
    setProductosMostrar([]);*/
    return handleShowArticulos();
  }


/*
  const getKeyProductosFiltrados = (id) => {
    return Array.from(productosFiltrados.keys()).find(pf => pf.id === id);
  }

  const existenProductosCargadosParaEstaPagina = (keyProdCard,nroPag) => {
    return productosFiltrados.get(keyProdCard) && productosFiltrados.get(keyProdCard).get(nroPag);
  }



  const actualizarPaginadorProductosFiltrados = (nroPagina) => {
    if(valorFiltro!==''){
      handleBusquedaARealizar(valorFiltro,nroPagina)
      return;
    }
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
      setIsProductsLoading(true);
      cargarProductosFiltrados(nroPagina,tipoProductoAMostrar.id)
        .then(res => {
          setProductosMostrar(res.get(nroPagina));

          setProductosCargados(res.get(nroPagina))
          setIsProductsLoading(false);
      })
    }else{
      let productosCargados = productosFiltrados.get(keyProdCard);
      setProductosMostrar(productosCargados.get(nroPagina));

      setProductosCargados(productosCargados.get(nroPagina))
    }
    setPagActual(nroPaginaAux);
  }

/!*  const handleProductosMostrar = (productosMostrarFiltrados) => {
    //si es undefined es porque se borro el filtro
    if(productosMostrarFiltrados){
      setProductosMostrar(productosMostrarFiltrados)
    }else{
      actualizarPaginadorProductosFiltrados(pagActual);
    }
  }*!/

  const handleBusquedaARealizar = (value,nroPaginaBuscar) => {
    let nroPaginaAux;
    if(nroPaginaBuscar){
      nroPaginaAux = nroPaginaBuscar;
      setPagActual(nroPaginaBuscar)
    }else{
      nroPaginaAux = pagActual;
    }

    if(nroPaginaAux>=1){
      nroPaginaAux=nroPaginaAux-1;
    }else{
      nroPaginaAux=0;
    }

    setValorFiltro(value);
    if(value==='' || value===undefined){
      //limpiar busqueda, pone lo que iba antes en tal pagina sin filtro
      let keyProdCard = Array.from(productosFiltrados.keys()).find(k => k.id === tipoProductoAMostrar.id);

      let productosCompletos = productosFiltrados.get(keyProdCard).get(nroPaginaAux);
      detallesProdFiltrados.totalPaginas = keyProdCard.totalPaginas;

      setDetallesProdFiltrados(detallesProdFiltrados);
      setProductosMostrar(productosCompletos);

    }else{
      let url;
      let nombreCampo;
      if(value==="MASCULINO" || value==="FEMENINO"){
        url="productos/byProductTypeAndGenero";
        nombreCampo="genero";
      }else{
        url="productos/byProductTypeAndNombre";
        nombreCampo="nombre"
      }

      //realizar busqueda
      setIsProductsLoading(true)
      cargarProductosPorCampoYTipoProducto(url,nombreCampo,value,
        nroPaginaAux,detallesProdFiltrados.id)
        .then(res => {
          //Actualizamos a detalles el total De paginas
          let detallesProductosFiltradosAux = {};
          detallesProductosFiltradosAux.id = detallesProdFiltrados.id;
          detallesProductosFiltradosAux.nombre = detallesProdFiltrados.nombre;
          detallesProductosFiltradosAux.totalPaginas = res.totalPages;
          detallesProductosFiltradosAux.pagActual = pagActual;

          setDetallesProdFiltrados(detallesProductosFiltradosAux)

          //Cargamos los productos con su tipoProducto obj
          let productosCompletos = cargarTipoProductoAProductos(res.content,tiposProductos)
          setProductosMostrar(productosCompletos);
          setIsProductsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setIsProductsLoading(false)
        })
    }
  }
*/


  const eliminarCamposVacios = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    });
    return obj;
  };

  const getNroPagParaBD = (nroPag) => {
    let nroPagParaBD;
    if(nroPag>1){
      nroPagParaBD=nroPag-1
    }else{
      nroPagParaBD=0;
    }
    return nroPagParaBD;
  }

  const esNuevaBusqueda = (campos) => {
    let ret=false;
    Object.keys(campos).forEach( nombreCampo => {
      if(nombreCampo === 'nombre') {
        if(campos[nombreCampo] !== valorBuscador){
          ret = true;
        }
      }
      if(nombreCampo === 'genero') {
        if(campos[nombreCampo] !== valorGenero){
          ret = true;
        }
      }
      if(nombreCampo === 'tipoProducto') {
        if(campos[nombreCampo] !== tipoProductoAMostrar.id){
          ret = true;
        }
      }
    })
    return ret;
  }

  const handleNuevaPagina = (nroPag) => {
    let nroPagParaBD = getNroPagParaBD(nroPag);
    console.log("estado pagina actual:");
    console.log(pageToShow)
    if(pageToShow.pages[nroPagParaBD]){
      console.log("pag cargada")
      setProductsToShow(pageToShow.pages[nroPagParaBD].products);
    }else{
      console.log("se hace la request")
      const campos = {
        tipoProducto: tipoProductoAMostrar.id
      };
      if(valorBuscador!==''){
        campos.nombre = valorBuscador
      }
      if(valorGenero!==''){
        campos.genero = valorGenero;
      }
      handleBusqueda(campos,nroPagParaBD);
    }
    setPagActual(nroPag);
  }

  const handleFiltroPorNombre = (value) => {
    setValorBuscador(value)
    let nroPagParaBD = getNroPagParaBD(pagActual);
    const campos = {
      tipoProducto: tipoProductoAMostrar.id,
      nombre: value,
      genero: valorGenero
    }
/*    if(valorGenero!==''){
      campos.genero = valorGenero;
    }*/
    handleBusqueda(campos,nroPagParaBD);
  }
  const handleFiltroPorGenero = (value) => {
    setValorGenero(value)
    let nroPagParaBD = getNroPagParaBD(pagActual);
    const campos = {
      tipoProducto: tipoProductoAMostrar.id,
      genero: value,
      nombre: valorBuscador
    }
    handleBusqueda(campos,nroPagParaBD);
  }

  const handleBusqueda = async (campos,nroPagBD) => {
    setIsProductsLoading(true);

    const camposSinObjVacios = eliminarCamposVacios({...campos});
    console.log("campos a buscar en bd");
    console.log(camposSinObjVacios)
    const pagGenerada = await cargarPaginaProductosFiltrados(
      camposSinObjVacios,nroPagBD,CLIENT_CANT_OBJ_TO_SHOW,tiposProductos);
    setIsProductsLoading(false);
    if(Object.keys(pageToShow).length===0 || esNuevaBusqueda(campos)){
      console.log("es nueva busqueda")
      // Si la busqueda es nueva sobreescribimos sobre la antigua pag. pagGenerada solo tiene la pag que se pidio
      setPageToShow(pagGenerada);
    }else{
      console.log("se sigue con los mismos parametros")
      //si se sigue con los mismos parametros de busqueda, entonces se agrega al arreglo de paginas
      pageToShow.pages[nroPagBD] = {
        nroPag: nroPagBD,
        products: pagGenerada.pages[nroPagBD].products
      };
      setPageToShow(pageToShow);
    }
    setProductsToShow(pagGenerada.pages[nroPagBD].products);

  }

  useEffect(() => {
    if(show){
/*      let keyProdCard = getKeyProductosFiltrados(tipoProductoAMostrar.id);
      actualizarPaginadorProductosFiltrados(1);
      setDetallesProdFiltrados(keyProdCard);*/

      handleBusqueda({tipoProducto:tipoProductoAMostrar.id},0);
      // handleNuevaPagina(1);
    }
  },[show]);

  return (
    <>
      <div className={`articulos ${show&&'show'}`}>
        <div className={'articulos-btn-container'}>
          <button onClick={handleClickVolver}><MdKeyboardBackspace /> Volver
          </button>
        </div>
        {/*Filtra por hombre-mujer y tiene el titulo*/}
        <Filtro
          // nombreCategoria={detallesProdFiltrados.nombre}
          nombreCategoria={pageToShow.nombre}
          setBusqueda={handleFiltroPorGenero}
        />
        <Buscador
          setBusquedaARealizar={handleFiltroPorNombre}
        />
{/*        {productosMostrar &&
        productosMostrar.length !== 0 &&
          !isProductsLoading ?
          productosMostrar
                .map((prod, index) => (
                    <Articulo key={index}
                      imageSource={
                        prod.imagen === 'null' ?
                          ''
                          : `${IMAGES_URL}${prod.imagen}?timestamp=${new Date().getTime()}`
                      }
                      nombreProducto={prod.nombre}
                      nombreCategoria={prod.tipoProducto.nombre}
                      precio={prod.precio}
                      producto={prod}
                    />
                ))
              :
          isProductsLoading ?
            <Spinner animation="border" />
            :
            <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>
        }*/}
        {
          productsToShow && productsToShow.length>0 &&
          !isProductsLoading ?
          productsToShow.map(prod => (
            <Articulo key={prod.id}
                      imageSource={
                        prod.imagen === 'null' ?
                          ''
                          : `${IMAGES_URL}${prod.imagen}?timestamp=${new Date().getTime()}`
                      }
                      nombreProducto={prod.nombre}
                      nombreCategoria={prod.tipoProducto.nombre}
                      precio={prod.precio}
                      producto={prod}
            />
          ))
          :
          isProductsLoading ?
          <Spinner animation="border" />
          :
          <h4 className="text-uppercase text-center" style={{ color: "red" }}>No hay productos en venta</h4>
        }
        <Paginador
          // setPaginaAnterior={actualizarPaginadorProductosFiltrados}
          // setPaginaSiguiente={actualizarPaginadorProductosFiltrados}
          // setPaginaActual={actualizarPaginadorProductosFiltrados}

          setPaginaAnterior={handleNuevaPagina}
          setPaginaSiguiente={handleNuevaPagina}
          setPaginaActual={handleNuevaPagina}


          // numeroTotalDePaginas={detallesProdFiltrados.totalPaginas}
          numeroTotalDePaginas={pageToShow.totalPag }
          paginaActual={pagActual}
          // show={ ((detallesProdFiltrados.totalPaginas > 0) && show) }
          show={ pageToShow.totalPag > 0 && show}
          color={"#007BFF"}
        />
          </div>

    </>
  );
}

export default Articulos;
