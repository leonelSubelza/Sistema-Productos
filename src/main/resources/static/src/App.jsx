import "./App.css";
// import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PantallaAdministrador from "./components/administrador/PantallaAdministrador";
import Login from "./components/login/Login";

function App() {
  return (
      <Router>
        <FuncionesTablaContext>
          <Routes>
            <Route exact path="/" element={<VentanaCliente />} />
            <Route path="/login" element={<Login />} />
            <Route path="/administrador/*" element={<PantallaAdministrador />} />
            <Route path='*' element={<VentanaCliente />} />
          </Routes>
        </FuncionesTablaContext>
      </Router>
    );
}

export default App;
