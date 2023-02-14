import "./App.css";
import Contenido from "./components/ventana-cliente/contenido/Contenido";
import Footer from "./components/ventana-cliente/footer/Footer";
import Header from "./components/ventana-cliente/header/Header";
import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";

import { BrowserRouter as Router, Route, Switch,Routes } from "react-router-dom";

function App() {
  return (
    <div className="padre">
      <FuncionesTablaContext>
        
          <Routes>
            <Route exact path="/" element={<VentanaCliente />} />
            <Route
              path="/gestion-productos/*"
              element={<PantallaGestionProductos />}
            />
          </Routes>
        
      </FuncionesTablaContext>
      {/* <PantallaGestionProductos /> */}
    </div>
  );
}

export default App;
