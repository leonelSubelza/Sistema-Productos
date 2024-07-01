import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { funcionesContext } from "../../context/FuncionesTablaContext"
import TabProductos from "./gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./gestionarTipoProductos/TabTipoProductos.jsx";
import Navbar from "./sidebar/NavBar";
import '../../styles/ventana-productos/Pantallas.css';
import {entityLoaderContextProvider} from "../../context/EntityLoaderContext.jsx";
import {useSelector} from "react-redux";

export default function PantallaAdministrador() {
    const [showTablaProductos, setShowTablaProductos] = useState(true);
    const [showTablaTipoProductos, setShowTablaTipoProductos] = useState(false);
    const navigate = useNavigate();

    const { cargarEntidad } = useContext(entityLoaderContextProvider)

    const { sesionIniciada } =
      useContext(funcionesContext);

    useEffect(()=>{
      if(!sesionIniciada){
        navigate("/");
        return;
      }

      cargarEntidad('tiposProductos')
        .then(response => {
          console.log("tiposProd:")
          console.log(response);
          cargarEntidad("productos",response)
        });
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
          <TabProductos show={showTablaProductos}/>
          <TabTipoProducto show={showTablaTipoProductos}/>
        </div>
      }
      </>
    );
  }
  