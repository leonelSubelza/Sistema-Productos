import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { funcionesContext } from "../../context/FuncionesTablaContext"
import TablaProductos from "./gestionarProductos/TablaProductos.jsx";
import TablaTipoProducto from "./gestionarTipoProductos/TablaTipoProductos.jsx";
import Navbar from "./dashboard/NavBar";
import '../../styles/ventana-productos/Pantallas.css';

export default function PantallaAdministrador() {
    const [showTablaProductos, setShowTablaProductos] = useState(true);
    const [showTablaTipoProductos, setShowTablaTipoProductos] = useState(false);
    const navigate = useNavigate();
  
    const { sesionIniciada } =
      useContext(funcionesContext);

    useEffect(()=>{
      if(!sesionIniciada){
        navigate("/");
        return;
      }
    },[])
  
    const handleNavbarItemClick = (showTablaProductos) => {
        if(showTablaProductos){
            setShowTablaProductos(true);
            setShowTablaTipoProductos(false);
            navigate("/administrador")
            return;
        }else{
            setShowTablaProductos(false);
            setShowTablaTipoProductos(true);
            navigate("/administrador/tablaTipoProductos")
            return;
        }
    }

    return (
      <>{sesionIniciada && 
        <div className="contenedor-pantalla-productos">
          <Navbar 
          showTablaProductos = {handleNavbarItemClick}
          />
          <TablaProductos show={showTablaProductos}/>
          <TablaTipoProducto show={showTablaTipoProductos}/>
        </div>
      }
      </>
    );
  }
  