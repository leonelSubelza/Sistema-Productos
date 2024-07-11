import "./App.css";
import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import { FuncionesClienteContext}  from "./context/FuncionesClienteContext.jsx";
import VentanaCliente from "./pages/client/VentanaCliente.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Suspense, lazy, useEffect} from "react";
import {useEntityLoaderFunction} from "./hooks/useEntityLoaderFunction.js";
import {PrivateRoutes, PublicRoutes} from "./router/routes.js";
import AuthGuard from "./router/guards/auth.guard.jsx";
import TabDetails from "./pages/admin/gestionarDetails/TabDetails.jsx";
import TabProductos from "./pages/admin/gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./pages/admin/gestionarTipoProductos/TabTipoProductos.jsx";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const {cargarValoresIniciales} = useEntityLoaderFunction();

  useEffect(() => {
    cargarValoresIniciales();
  }, []);

  const Login = lazy(() => import('./pages/login/Login.jsx'));
  /*const TabProductos = lazy(() => import('./pages/admin/gestionarProductos/TabProductos.jsx'));
  const TabTipoProducto = lazy(() => import('./pages/admin/gestionarTipoProductos/TabTipoProductos.jsx'));
  const TabNumeroWhatsapp = lazy(() => import('./pages/admin/gestionarWhatsapp/TabNumeroWhatsapp.jsx'));*/

  return (
    <>
      <Suspense fallback={<div className={'spinner-container-login'}><Spinner variant={"light"} animation="border"/></div>}>
        <FuncionesTablaContext>
          <FuncionesClienteContext>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<VentanaCliente/>}/>
                <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
                <Route element={<AuthGuard/>}>
                  <Route exact path={PrivateRoutes.PRODUCTS} element={<TabProductos/>}/>
                  <Route exact path={PrivateRoutes.PRODUCT_TYPES} element={<TabTipoProducto/>}/>
                  <Route exact path={PrivateRoutes.PAGE_DETAILS} element={<TabDetails/>}/>
                </Route>
                <Route path="*" element={<VentanaCliente/>}/>
              </Routes>
            </BrowserRouter>
          </FuncionesClienteContext>
        </FuncionesTablaContext>
      </Suspense>
    </>
  );
}

export default App;
