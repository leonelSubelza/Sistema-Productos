import React, { useState,useContext,useCallback } from "react";
import { cargarObjetos, borrarObjeto } from "../service/GestionProductos";

import SpinnerLoading from "../components/gestion-productos/SpinnerLoading";
import MensajeToast from "../components/gestion-productos/MensajeToast";

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

  const actualizarTablaGenerica = useCallback(async (entidad) => {    
    setMensajeSpinner("Actualizando Tabla");
    setShowSpinner(true);
    return cargarObjetos(entidad)
      .then((response) => {
        setShowSpinner(false);
        console.log('deberia cerrarse el spinner');
        return response;
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
        return [];
      });
  }, [setMensajeSpinner, setShowSpinner, setToast]);

  const borrarProductoGenerico = (entidad, idEntidad) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    borrarObjeto(entidad, idEntidad)
      .then(async () => {
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
  };

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
      }}
    >
      <SpinnerLoading/>
      <MensajeToast/>
      {children}
    </funcionesContext.Provider>
  );
}
