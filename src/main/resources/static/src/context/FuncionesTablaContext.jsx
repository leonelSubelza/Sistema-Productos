import React, { useState,useCallback, useEffect } from "react";
import { cargarObjetos, borrarObjeto,crearObjeto } from "../service/GestionProductos";

import SpinnerLoading from "../components/gestion-productos/SpinnerLoading";
import MensajeToast from "../components/gestion-productos/MensajeToast";

import {connect} from '../service/WebSocket.js';

export const funcionesContext = React.createContext();

export function FuncionesTablaContext({ children }) {
  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState(""); //el msj del spinner puede variar

  //Toast
  const [toast, setToast] = useState({
    show: false,
    msjBody: "",
    color: "#dc1717",
  });

  const actualizarTablaGenerica = useCallback(async (direccion) => {    
    setMensajeSpinner("Actualizando Tabla");
    setShowSpinner(true);
    return cargarObjetos(direccion)
      .then((response) => {
        setShowSpinner(false);
        return response;
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
        console.log('deberia mostrar toast');
        return [];
      });
  }, [setMensajeSpinner, setShowSpinner, setToast]);

  const borrarProductoGenerico = useCallback( async (direccion, idEntidad) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    return borrarObjeto(direccion, idEntidad)
      .then(() => {
        setShowSpinner(false);
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
  }, [setMensajeSpinner, setShowSpinner, setToast]);


  const agregarProductoGenerico = useCallback( async(direccion,objeto,method) => {
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    return crearObjeto(direccion,objeto, method).then(() => {
      setShowSpinner(false);
    });
  },[setMensajeSpinner,setShowSpinner]);

  useEffect(()=>{
    connect()
  },[])

  return (
    <funcionesContext.Provider
      value={{
        showSpinner,
        setShowSpinner,
        mensajeSpinner,
        setMensajeSpinner,
        toast,
        setToast,
        actualizarTablaGenerica,
        borrarProductoGenerico,
        agregarProductoGenerico
      }}
    >
      <SpinnerLoading />
      <MensajeToast />
      {children}
    </funcionesContext.Provider>
  );
}
