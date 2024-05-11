import {useCallback} from "react";
import {crearObjeto} from "../service/GestionProductos";

export const agregarProductoGenerico =  async(direccion,objeto,imagen,method,funcionesTablaContext) => {
    const {
        setMensajeSpinner,
        setShowSpinner,
        mensajeSpinner,
    } = funcionesTablaContext;
    console.log("se ejecuta agregarProductoGenerico")
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    crearObjeto(direccion,objeto, imagen,method).then(() => {
        if(mensajeSpinner !== 'Actualizando Tabla'){
            setShowSpinner(false);
        }
    })
        .catch(e => {setShowSpinner(false)});
    /*    try{
          await crearObjeto(direccion,objeto, imagen,method);
          if(mensajeSpinner !== 'Actualizando Tabla'){
                setShowSpinner(false);
          }
          return true;
        }catch(e) {
          setShowSpinner(false)
        }*/
}