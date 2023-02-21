import React, { useState,useCallback, useEffect } from "react";
import { cargarObjetos, borrarObjeto,crearObjeto } from "../service/GestionProductos";

import SpinnerLoading from "../components/gestion-productos/SpinnerLoading";
import MensajeToast from "../components/gestion-productos/MensajeToast";

import WebSocket from '../service/WebSocket.js';

export const funcionesContext = React.createContext();

export function FuncionesTablaContext({ children }) {
  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState(""); //el msj del spinner puede variar

  const [productos, setProductos] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);


  //Carga las variables productos y tiposProductos
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
        //console.log("prod agregado: " + JSON.stringify(prod));
      });

      tiposProductos.push(tipoProductoObj);
    });
    setTiposProductos(tiposProductos);
    setProductos(productosPiolas);
  };

  //Toast
  const [toast, setToast] = useState({
    show: false,
    msjBody: "",
    color: "#dc1717",
  });

  const manejarMsjRecibido=(payload)=>{
    console.log('se recibe msj de la poronga del servidor')
    actualizarTablaGenerica('tiposProductos')
  }

  const actualizarTablaGenerica = useCallback(async (direccion) => {  
    console.log('deberia actualizar la tabla')  
    setMensajeSpinner("Actualizando Tabla");
    setShowSpinner(true);
    cargarObjetos(direccion)
      .then((response) => {
        setShowSpinner(false);
        cargarValores(response);
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
        console.log('deberia mostrar toast');
      });
  }, [setMensajeSpinner, setShowSpinner, setToast]);

  const borrarProductoGenerico = useCallback( async (direccion, idEntidad) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    return borrarObjeto(direccion, idEntidad)
      .then(() => {
        if(mensajeSpinner !== 'Actualizando Tabla'){
          setShowSpinner(false);
        }
        
        return;
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Se ha producido un error al borrar",
          color: "#dc1717",
        });
      });
  }, [setMensajeSpinner, setShowSpinner, setToast,mensajeSpinner]);


  const agregarProductoGenerico = useCallback( async(direccion,objeto,method) => {
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    return crearObjeto(direccion,objeto, method).then(() => {
      if(mensajeSpinner !== 'Actualizando Tabla'){
        setShowSpinner(false);
      }
    });
  },[setMensajeSpinner,setShowSpinner,mensajeSpinner]);


  useEffect(()=>{
    actualizarTablaGenerica('tiposProductos')
  },[actualizarTablaGenerica])

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
        actualizarTablaGenerica,
        borrarProductoGenerico,
        agregarProductoGenerico,
        cargarValores
      }}
    >
      <SpinnerLoading />
      <MensajeToast />
      <WebSocket mensajeRecibido={(res)=>manejarMsjRecibido(res)}/>
      {children}
    </funcionesContext.Provider>
  );
}
