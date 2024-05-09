import TablaProductos from "./gestionarProductos/TablaProductos";
import Navbar from "./dashboard/NavBar";
import "../../styles/ventana-productos/Pantallas.css";
import { funcionesContext } from "../../context/FuncionesTablaContext";
import { useContext, useEffect } from "react";
import { Navigate, NavigateFunction, useNavigate } from "react-router-dom";

export default function PantallaGestionProductos() {

  const navigate = useNavigate();

  const { sesionIniciada } =
    useContext(funcionesContext);

  useEffect(()=>{
    if(!sesionIniciada){
      navigate("/");
      return;
    }
  },[])

  return (
    <>{sesionIniciada && 
      <div className="contenedor-pantalla-productos">
        <Navbar />
        <TablaProductos />
      </div>
    }
    </>
  );
}
