import React, { useState, useEffect } from "react";
import { cargarObjetosConPaginacion, borrarObjeto,crearObjeto, cargarTodosLosObjetos } from "../service/GestionProductos";

import SpinnerLoading from "../components/utils/SpinnerLoading.jsx";
import MensajeToast from "../components/utils/MensajeToast.jsx";

import { administradorCantObjPorTabla } from "../service/Configuracion.js";
import {useEntityLoaderFunction} from "../hooks/useEntityLoaderFunction.js";
import {useSelector} from "react-redux";
import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
export const funcionesContext = React.createContext();

export const datosPagina = {
  id: 0,
  nombre: "",
  totalPaginas:0,
  pagActual:0
}

export function FuncionesTablaContext({ children }) {
  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState(""); //el msj del spinner puede variar

  //Contiene los productos que se reciben en cada request o.O
  const [productos, setProductos] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);

  const [sesionIniciada, setSesionIniciada] = useState(false);

  //Paginacion
  //cantidad total de paginas que habra
  const [cantPaginasPorProducto, setCantPaginasPorProducto] = useState(0)
  const [paginaActualProductos,setPaginaActualProductos] = useState(1)

  //Guarda los productos ya cargados
  //Es un Map<TipoProducto, Map<NumPagina,Productos>>
  const [productosCargados, setProductosCargados] = useState(new Map());

  // const { updateProducts,updateProductsIsDataLoading } = useProductsActions();
  const {    cargarTipoProductoYTodosLosProductos, cargarEntidadConPaginacion} = useEntityLoaderFunction();

  //NUEVO
/*  const [todosLosProductosConPaginacion, setTodosLosProductosConPaginacion] = useState(new Map());
  const [productosFiltrados, setProductosFiltrados] = useState(new Map());*/

  const pageDetails = useSelector(store => store.pageDetails);
  // const products = useSelector(store => store.products);
  const productsType = useSelector(store => store.productsType.value)

  const { updateLoadingPageDetails } = usePageDetailsActions();
  const { resetProducts } = useProductsActions();
  const { resetProductsType } = useProductsTypeActions();


    //Toast
    const [toast, setToast] = useState({
      show: false,
      msjBody: "",
      color: "#dc1717",
    });
  //Carga las variables productos y tiposProductos

  //msj recibido del ws que dice qué actualizar
/*  const manejarMsjRecibido = (payload)=>{
    actualizarValores(paginaActualProductos);
  };*/
/*  const reiniciarProductosCargadosMap = () => {
    let prodCargadosAux= productosCargados;
    for (var obj of prodCargadosAux) {
      productosCargados.delete(obj[0]);
    }
  }*/

  const getTipoProducto = (id,tiposProduct) => {
    return tiposProduct.find(tipoProd => tipoProd.id === id);
  }

  //A cada objeto se le asigna su objeto tipoProducto correspondiente
  const cargarTipoProductoAProductos = (productosBD,tiposProduct) => {
    if(productosBD === undefined || tiposProduct === undefined ||
      productosBD.length === 0 || tiposProduct.length === 0){ 
      return
    }
    let productosAux = [];
    productosBD.forEach(prod => {
      prod.tipoProducto = getTipoProducto(prod.productTypeId,tiposProduct);
      productosAux.push(prod);
    })
    return productosAux;
  }

  //Al actualizar los tipoProduct también se actualizan los productos asociados a los tipoProducto
  const actualizarTipoProductos =  async () => {
    //Cargamos todos los tipoProductos
    let location = window.location.href;
    setMensajeSpinner("Actualizando Tabla");
    if(location.includes('/administrador') || location.includes('/administrador/tablaTipoProductos')){
      setShowSpinner(true);
      setMensajeSpinner("Actualizando Tabla");
    }
    try{
      const response = await cargarTodosLosObjetos("tiposProductos");
      setShowSpinner(false);
      setTiposProductos(response);
      // cargarTipoProductoAProductos(productos,response);
      return response;
    } catch(e){
      setShowSpinner(false);
      console.error("Error al actualizar tipo productos:", e);
      setToast({
        show: true,
        msjBody: "Error conectando al servidor",
        color: "#dc1717",
      });
    }
  };

  const actualizarProductos =  async (direccion,page,size, tiposProductos) => {
    let location = window.location.href;
    if(location.includes('/administrador') || location.includes('/administrador/tablaTipoProductos')){
      setMensajeSpinner("Actualizando Tabla");
      setShowSpinner(true);
    }
    //Cargamos algunos productos
      try{
          const response = await cargarObjetosConPaginacion(direccion,page,size);
          setShowSpinner(false);
          const productosCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
          setCantPaginasPorProducto(response.totalPages);
          setProductos(productosCargadosCompletos);


          productosCargados.set(page+1,productosCargadosCompletos);
          setProductosCargados(productosCargados)
          return productosCargadosCompletos;
      }catch(e) {
          setShowSpinner(false);
          console.log("callo act prod: "+e);
          setToast({
              show: true,
              msjBody: "Error contectando al servidor",
              color: "#dc1717",
          });
      }
  };

  const borrarProductoGenerico = async (direccion, idEntidad) => {
    try{
      updateLoadingPageDetails(true,"Borrando de DB");
      await borrarObjeto(direccion, idEntidad);
      updateLoadingPageDetails(false,"")
      if(direccion === "productos"){
        resetProducts();
        await cargarEntidadConPaginacion("productos",0,administradorCantObjPorTabla,productsType);
      }
      if(direccion === 'tiposProductos'){
        resetProducts();
        resetProductsType()
        await cargarTipoProductoYTodosLosProductos(pageDetails.paginaActual);
      }
    }catch (err) {
      updateLoadingPageDetails(false,"")
      console.log(err)
    }
  }

  const agregarProductoGenerico = async (direccion,objeto,imagen,method) => {
    // setMensajeSpinner("Guardando en DB");
    // setShowSpinner(true);
    updateLoadingPageDetails(true,"Guardando en DB");
    try{
      await crearObjeto(direccion,objeto, imagen,method)
      updateLoadingPageDetails(false,"");
      if(direccion === "productos"){
        resetProducts();
        await cargarEntidadConPaginacion("productos",pageDetails.paginaActual-1,administradorCantObjPorTabla,productsType);
      }
      if(direccion === 'tiposProductos'){
        resetProducts();
        resetProductsType()
        await cargarTipoProductoYTodosLosProductos(pageDetails.paginaActual-1);
      }
      // setShowSpinner(false);
      // reiniciarProductosCargadosMap();
      // actualizarValores(paginaActualProductos);
    }catch(e){
      console.log("error en agregarProductoGenerico: "+e)
      updateLoadingPageDetails(false,"");
      /*setShowSpinner(false)
      setToast({
        show: true,
        msjBody: "Se ha producido un error al agregar",
        color: "#dc1717",
      });*/
    }
  };

  const actualizarValores = async (pagActual) => {
    const tiposProductosAct = await actualizarTipoProductos();
    await actualizarProductos(
      "productos",
      pagActual - 1,
      administradorCantObjPorTabla,
      tiposProductosAct);
  }

  useEffect(()=>{
    actualizarValores(paginaActualProductos);
  },[])

  return (
    <funcionesContext.Provider
      value={{
        productos,
        setProductos,
        tiposProductos,
        setTiposProductos,
        showSpinner,
        setShowSpinner,
        mensajeSpinner,
        setMensajeSpinner,
        toast,
        setToast,
        // actualizarTablaGenerica,
        borrarProductoGenerico,
        agregarProductoGenerico,
        actualizarTipoProductos,
        actualizarProductos,
        actualizarValores,
        sesionIniciada, setSesionIniciada,
        cantPaginasPorProducto,
        paginaActualProductos,setPaginaActualProductos,
        productosCargados, setProductosCargados,
        cargarTipoProductoAProductos
      }}
    >
      <SpinnerLoading />
      <MensajeToast />
      {/*<WebSocket mensajeRecibido={manejarMsjRecibido}/>*/}
      {children}
    </funcionesContext.Provider>
  );
}
