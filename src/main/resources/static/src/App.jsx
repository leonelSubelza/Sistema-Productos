import "./App.css";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import { FuncionesClienteContext}  from "./context/FuncionesClienteContext.jsx";
import VentanaCliente from "./components/ventana-cliente/VentanaCliente";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import {useEffect} from "react";
import TabProductos from "./components/administrador/gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./components/administrador/gestionarTipoProductos/TabTipoProductos.jsx";
import TabNumeroWhatsapp from "./components/administrador/gestionarWhatsapp/TabNumeroWhatsapp.jsx";
import {useEntityLoaderFunction} from "./hooks/useEntityLoaderFunction.js";
import {PrivateRoutes, PublicRoutes} from "./router/routes.js";
import AuthGuard from "./router/guards/auth.guard.jsx";

function App() {
  const { cargarValoresIniciales } = useEntityLoaderFunction();

  useEffect(() => {
    cargarValoresIniciales();
  }, []);

  return (
    <>
      <FuncionesTablaContext>
        <FuncionesClienteContext>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<VentanaCliente />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard />}>
                <Route exact path={PrivateRoutes.PRODUCTS} element={<TabProductos />} />
                <Route exact path={PrivateRoutes.PRODUCT_TYPES} element={<TabTipoProducto />} />
                <Route exact path={PrivateRoutes.PAGE_DETAILS} element={<TabNumeroWhatsapp />} />
              </Route>
              <Route path="*" element={<VentanaCliente />} />
            </Routes>
          </BrowserRouter>
        </FuncionesClienteContext>
      </FuncionesTablaContext>
      </>
  );
}

export default App;
