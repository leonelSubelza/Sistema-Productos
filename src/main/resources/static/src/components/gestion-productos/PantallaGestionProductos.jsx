import TablaProductos from "./gestionarProductos/TablaProductos";
import Navbar from "./dashboard/NavBar";
import "../../styles/ventana-productos/Pantallas.css";

export default function PantallaGestionProductos() {

  return (
    <div className="contenedor-pantalla-productos">
      <Navbar />
      <TablaProductos />
    </div>
  );
}
