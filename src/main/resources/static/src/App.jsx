import "./App.css";
import VentanaCliente from "./pages/client/VentanaCliente.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {Suspense, lazy, useEffect, useRef} from "react";
import {useEntityLoaderFunction} from "./hooks/useEntityLoaderFunction.js";
import {PrivateRoutes, PublicRoutes} from "./router/routes.js";
import AuthGuard from "./router/guards/auth.guard.jsx";
import TabDetails from "./pages/admin/gestionarDetails/TabDetails.jsx";
import TabProductos from "./pages/admin/gestionarProductos/TabProductos.jsx";
import TabTipoProducto from "./pages/admin/gestionarTipoProductos/TabTipoProductos.jsx";
import Spinner from "react-bootstrap/Spinner";
import {useSelector} from "react-redux";
import {toast, Toaster} from 'sonner'
function App() {
  const pageDetails = useSelector(store => store.pageDetails);
  const {cargarValoresIniciales} = useEntityLoaderFunction();
  const isToastActive = useRef(false)

  useEffect(() => {
    let location = window.location.href;
    if (location.includes('/administrador') && !isToastActive.current && pageDetails.loadingMessage!=='') {
      toast.loading(pageDetails.loadingMessage);
      isToastActive.current = true
    }
    if(!pageDetails.loading){
      isToastActive.current = false
      toast.dismiss();
    }
  }, [pageDetails.loading]);

  useEffect(() => {
    cargarValoresIniciales();
  }, []);

  const Login = lazy(() => import('./pages/login/Login.jsx'));
  /*const TabProductos = lazy(() => import('./pages/admin/gestionarProductos/TabProductos.jsx'));
  const TabTipoProducto = lazy(() => import('./pages/admin/gestionarTipoProductos/TabTipoProductos.jsx'));
  const TabNumeroWhatsapp = lazy(() => import('./pages/admin/gestionarWhatsapp/TabNumeroWhatsapp.jsx'));*/

  return (
    <>
      <Suspense
        fallback={<div className={'spinner-container-login'}><Spinner variant={"light"} animation="border"/></div>}>
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
      </Suspense>
      <Toaster richColors position="bottom-left"/>
    </>
  );
}

export default App;
