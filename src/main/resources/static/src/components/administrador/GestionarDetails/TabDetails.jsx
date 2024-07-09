import "../../../styles/ventana-productos/Tabla.css";
import "../../../styles/ventana-productos/Pantallas.css";
import Navbar from "../sidebar/NavBar.jsx";
import EditarDetallesPagina from "./content/EditarDetallesPagina.jsx";
import { Container } from "reactstrap";
const TabDetails = () => {


    return (
        <div className="contenedor-pantalla-productos">
            <Navbar/>
            <div className={`contenedor-tabla show`}>
                <Container className="contenedor-sin-fondo">
                    <EditarDetallesPagina/>
                </Container>
            </div>
        </div>
    );
};

export default TabDetails;
