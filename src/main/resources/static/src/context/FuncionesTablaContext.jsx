import React, { useState,useCallback, useEffect } from "react";
import { cargarObjetosConPaginacion, borrarObjeto,crearObjeto, cargarTodosLosObjetos } from "../service/GestionProductos";

import SpinnerLoading from "../components/utils/SpinnerLoading.jsx";
import MensajeToast from "../components/utils/MensajeToast.jsx";

import WebSocket from '../service/WebSocket.js';
import { administradorCantObjPorTabla } from "../service/Configuracion.js";
export const funcionesContext = React.createContext();

export function FuncionesTablaContext({ children }) {
  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState(""); //el msj del spinner puede variar

  const [productos, setProductos] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);

  const [sesionIniciada, setSesionIniciada] = useState(false);

  //Paginacion
  const [cantPaginasPorProducto, setCantPaginasPorProducto] = useState(0)

    //Toast
    const [toast, setToast] = useState({
      show: false,
      msjBody: "",
      color: "#dc1717",
    });
  //Carga las variables productos y tiposProductos

  /*
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
  };
  */

  const getTipoProducto = (id,tiposProduct) => {
    return tiposProduct.find(tipoProd => tipoProd.id === id);
  }

  //A cada objeto se le asigna su objeto tipoProducto correspondiente
  const cargarTipoProductoAProductos = (productosBD,tiposProduct) => {
    if(productosBD === undefined || tiposProduct === undefined ||
      productosBD.length === 0 || tiposProduct.length === 0){ 
      return
    };
    let productosAux = [];
    productosBD.forEach(prod => {
      prod.tipoProducto = getTipoProducto(prod.productTypeId,tiposProduct);
      productosAux.push(prod);
    })
    return productosAux;
  }

  //msj recibido del ws que dice qué actualizar
  const manejarMsjRecibido=(payload)=>{
    actualizarValores();
  }

  //Al actualizar los tipoProduct también se actualizan los productos asociados a los tipoProducto
  const actualizarTipoProductos = async () => {
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
    // cargarTodosLosObjetos("tiposProductos")
    // .then((response) => {
    //   setShowSpinner(false);
    //   setTiposProductos(response);
    //   console.log("prodObtenidos");
    //   console.log(response);
    //   return response;
    // })
    // .catch(() => {
    //   setShowSpinner(false);
    //   console.log("callo act tipo prod");
    //   setToast({
    //     show: true,
    //     msjBody: "Error contectando al servidor",
    //     color: "#dc1717",
    //   });
    // })
  }

  const actualizarProductos = async (direccion,page,size, tiposProductos) => {
    let location = window.location.href;
    if(location.includes('/administrador') || location.includes('/administrador/tablaTipoProductos')){
      setMensajeSpinner("Actualizando Tabla");
      setShowSpinner(true);
    }
    //Cargamos algunos productos
      try{
          const response = await cargarObjetosConPaginacion(direccion,page,size);
          setShowSpinner(false);
          const productosCargados = cargarTipoProductoAProductos(response.content,tiposProductos);
          setCantPaginasPorProducto(response.totalPages);
          setProductos(productosCargados);
          console.log("se cargan los productos:")
          console.log(productosCargados);
          return productosCargados;
      }catch(e) {
          setShowSpinner(false);
          console.log("callo act prod: "+e);
          setToast({
              show: true,
              msjBody: "Error contectando al servidor",
              color: "#dc1717",
          });
      }
  }

  const actualizarValores = async () => {
    try{
      console.log("se deberían actualizar valores")
      const tiposProductosAux = await actualizarTipoProductos();
      const productosAux = await actualizarProductos(
          "productos",
          0,
          administradorCantObjPorTabla,
          tiposProductosAux);
      setProductos(productosAux)
    }catch(e){
      console.log(e);
    }

  };
/*  const actualizarValores = useCallback(async () => {
    try{
      const tiposProductos = await actualizarTipoProductos();
      const productos = await actualizarProductos(
          "productos",
          0,administradorCantObjPorTabla,
          tiposProductos);
    }catch(e){
      console.log(e);
    }
    
  }, [setMensajeSpinner, setShowSpinner, setToast]);*/


  const borrarProductoGenerico = async (direccion, idEntidad) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    borrarObjeto(direccion, idEntidad)
        .then(() => {
          if(mensajeSpinner !== 'Actualizando Tabla'){
            setShowSpinner(false);
          }
        })
        .catch((error) => {
          console.log(error)
          setShowSpinner(false);
          setToast({
            show: true,
            msjBody: "Se ha producido un error al borrar",
            color: "#dc1717",
          });
        });
  }
/*  const borrarProductoGenerico = useCallback( async (direccion, idEntidad) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    borrarObjeto(direccion, idEntidad)
      .then(() => {
        if(mensajeSpinner !== 'Actualizando Tabla'){
          setShowSpinner(false);
        }
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Se ha producido un error al borrar",
          color: "#dc1717",
        });
      });
  }, [setMensajeSpinner, setShowSpinner, setToast,mensajeSpinner]);*/

  const agregarProductoGenerico = async (direccion,objeto,imagen,method) => {
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    try{
      await crearObjeto(direccion,objeto, imagen,method)
      // if(mensajeSpinner !== 'Actualizando Tabla'){
      setShowSpinner(false);
      // }
    }catch(e){
      console.log("error en agregarProductoGenerico: "+e)
      setShowSpinner(false)
    }
  };
/*  const agregarProductoGenerico = useCallback( async(direccion,objeto,imagen,method) => {
    // setMensajeSpinner("Guardando en DB");
    // setShowSpinner(true);
    // crearObjeto(direccion,objeto, imagen,method).then(() => {
    //   if(mensajeSpinner !== 'Actualizando Tabla'){
    //     setShowSpinner(false);
    //   }
    // })
    // .catch(e => setShowSpinner(false));
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    console.log("ejecutando agregarProductoGenerico")
    try{
      await crearObjeto(direccion,objeto, imagen,method)
      console.log("terminó de ejecutar crearObjeto")
      if(mensajeSpinner !== 'Actualizando Tabla'){
        setShowSpinner(false);
      }
    }catch(e){
      console.log("error en agregarProductoGenerico: "+e)
      setShowSpinner(false)
    }
  },[setMensajeSpinner,setShowSpinner,mensajeSpinner]);*/

  useEffect(()=>{
    actualizarValores();
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
        cantPaginasPorProducto
      }}
    >
      <SpinnerLoading />
      <MensajeToast />
      <WebSocket mensajeRecibido={(res)=>manejarMsjRecibido(res)}/>
      {children}
    </funcionesContext.Provider>
  );
}
