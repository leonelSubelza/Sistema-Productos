import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { funcionesContext } from "../../context/FuncionesTablaContext"
import TabProductos from "./gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./gestionarTipoProductos/TabTipoProductos.jsx";
import Navbar from "./sidebar/NavBar";
import '../../styles/ventana-productos/Pantallas.css';
import {entityLoaderContextProvider} from "../../context/EntityLoaderContext.jsx";
import {useSelector} from "react-redux";
import TablaNumeroWhatsapp from "./gestionarWhatsapp/TablaNumeroWhatsapp.jsx";

export default function PantallaAdministrador() {
    const [showTablaProductos, setShowTablaProductos] = useState(true);
    const [showTablaTipoProductos, setShowTablaTipoProductos] = useState(false);
    const [showTablaNumeroWhatsapp, setShowTablaNumeroWhatsapp] = useState(false);
    const navigate = useNavigate();

    const { sesionIniciada } = useContext(funcionesContext);

    useEffect(() => {
        if (!sesionIniciada) {
            navigate("/");
            return;
        }
        cargarEntidad('tiposProductos')
        .then(response => {
          console.log("tiposProd:")
          console.log(response);
          cargarEntidad("productos",response)
        });
    }, [sesionIniciada, navigate]);

    const handleNavbarItemClick = (view) => {
        if (view === "Productos") {
            setShowTablaProductos(true);
            setShowTablaTipoProductos(false);
            setShowTablaNumeroWhatsapp(false);
            navigate("/administrador");
        } else if (view === "Tipos de Productos") {
            setShowTablaProductos(false);
            setShowTablaTipoProductos(true);
            setShowTablaNumeroWhatsapp(false);
            navigate("/administrador/tablaTipoProductos");
        } else if (view === "Numero de Whatsapp") {
            setShowTablaProductos(false);
            setShowTablaTipoProductos(false);
            setShowTablaNumeroWhatsapp(true);
            navigate("/administrador/tablaNumeroWhatsapp");
        }
    };


    return (
        <>
            {sesionIniciada &&
                <div className="contenedor-pantalla-productos">
                    <Navbar
                        onNavbarItemClick={handleNavbarItemClick}
                    />
                    <TabProductos show={showTablaProductos} />
                    <TabTipoProducto show={showTablaTipoProductos} />
                    <TablaNumeroWhatsapp show={showTablaNumeroWhatsapp}/>
                </div>
            }
        </>
    );
}
