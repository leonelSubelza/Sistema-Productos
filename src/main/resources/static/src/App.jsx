import "./App.css";
// import PantallaGestionProductos from "./components/gestion-productos/PantallaGestionProductos";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import { FuncionesClienteContext}  from "./context/FuncionesClienteContext.jsx";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import {useEffect} from "react";
import {usePageDetailsActions} from "./redux/slices/pageDetails/usePageDetailsActions.js";
import {loadUserDetailsValues} from "./service/pageDetailsService.js";
import {EntityLoaderContext} from "./context/EntityLoaderContext.jsx";
import TabProductos from "./components/administrador/gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./components/administrador/gestionarTipoProductos/TabTipoProductos.jsx";
import TabNumeroWhatsapp from "./components/administrador/gestionarWhatsapp/TabNumeroWhatsapp.jsx";
import {useEntityLoaderFunction} from "./hooks/useEntityLoaderFunction.js";

function App() {
  const { cargarValoresIniciales } = useEntityLoaderFunction();

  useEffect(() => {
    cargarValoresIniciales();
  }, []);

  return (
    <Router>
      {/*<EntityLoaderContext>*/}
        <FuncionesTablaContext>
          <FuncionesClienteContext>
            <Routes>
              <Route exact path="/" element={<VentanaCliente/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path={'/administrador/productos'} element={<TabProductos/>}/>
              <Route path={'/administrador/tablaTipoProductos'} element={<TabTipoProducto/>}/>
              <Route path={'/administrador/numeroWhatsapp'} element={<TabNumeroWhatsapp/>}/>
              <Route path="/administrador/*" element={<TabProductos/>}/>
              <Route path='*' element={<VentanaCliente/>}/>
            </Routes>
          </FuncionesClienteContext>
        </FuncionesTablaContext>
      {/*</EntityLoaderContext>*/}
    </Router>
  );
}

export default App;
