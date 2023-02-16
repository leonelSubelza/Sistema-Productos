import TablaTipoProducto from './pages/TablaTipoProductos'
import Navbar from './dashboard/NavBar'
import "../../styles/ventana-productos/Pantallas.css";

function PantallaGestionTipoProducto() {
  return (
    <div className='contenedor-pantalla-productos'>
      <Navbar />
      <TablaTipoProducto />
    </div>
  )
}

export default PantallaGestionTipoProducto
