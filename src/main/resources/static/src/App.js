import "./App.css";
import Contenido from "./components/ventana-cliente/contenido/Contenido";
import Footer from "./components/ventana-cliente/footer/Footer";
import Header from "./components/ventana-cliente/header/Header";
import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";

function App() {
  return (
    <div className="padre">
      <FuncionesTablaContext>
        <PantallaGestionProductos />
      </FuncionesTablaContext>
    </div>
  );
}

export default App;
