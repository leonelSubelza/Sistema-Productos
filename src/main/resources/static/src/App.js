import "./App.css";
import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";

import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

function App() {
  return (
    <div className="padre">
      <FuncionesTablaContext>

        <Routes>
          <Route exact path="/" element={<VentanaCliente />} />
          {/* <Route
            path="/gestion-productos/*"
            element={<PantallaGestionProductos />}
          /> */}
          <Route path='*' element={<VentanaCliente />} />
        </Routes>

      </FuncionesTablaContext>
      {/* <PantallaGestionProductos /> */}
    </div>
  );
}

export default App;
