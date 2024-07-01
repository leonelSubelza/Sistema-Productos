import "./App.css";
// import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import { FuncionesClienteContext}  from "./context/FuncionesClienteContext.jsx";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PantallaAdministrador from "./components/administrador/PantallaAdministrador";
import Login from "./components/login/Login";
import {useEffect} from "react";
import {usePageDetailsActions} from "./redux/slices/pageDetails/usePageDetailsActions.js";
import {useSelector} from "react-redux";
import {loadUserDetailsValues} from "./service/GestionPageDetails.js";
import {EntityLoaderContext} from "./context/EntityLoaderContext.jsx";

function App() {
  const { setPageDetails } = usePageDetailsActions();

  const cargarPageDetails = () => {
    loadUserDetailsValues()
      .then(res => {
        console.log(res[0])
        setPageDetails(res[0])
      })
      .catch(e => {
        console.log(e)
      })
  }

/*  useEffect(() => {
    (async () => {
        await cargarPageDetails();
      console.log(appDetails)
    })();
  }, []);*/

  useEffect(() => {
    cargarPageDetails();
  }, []);

  return (

      <Router>
        <EntityLoaderContext>
        <FuncionesTablaContext>
          <FuncionesClienteContext>
            <Routes>
              <Route exact path="/" element={<VentanaCliente />} />
              <Route path="/login" element={<Login />} />
              <Route path="/administrador/*" element={<PantallaAdministrador />} />
              <Route path='*' element={<VentanaCliente />} />
            </Routes>
          </FuncionesClienteContext>
        </FuncionesTablaContext>
        </EntityLoaderContext>
      </Router>
    );
}

export default App;
