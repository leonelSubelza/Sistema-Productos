import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';
import Root from "../src/router/Root"
import App from './App';
import PantallaGestionProductos from './components/gestion-productos/PantallaGestionProductos'
import VentanaCliente from './components/ventana-cliente/VentanaCliente';
import TablaTipoProducto from './components/gestion-productos/pages/TablaProductos';
import PantallaGestionTipoProducto from './components/gestion-productos/PantallaGestionTipoProducto';

import { FuncionesTablaContext } from "./context/FuncionesTablaContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
const AppLayout = () => (
  <>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <VentanaCliente />,
      },
      {
        path: "/administrador",
        element: <PantallaGestionProductos />,
      },
      {
        path: "/administrador/tablaTipoProductos",
        element: <PantallaGestionTipoProducto />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <FuncionesTablaContext>
    <RouterProvider router={router} />
    </FuncionesTablaContext>
  </React.StrictMode>
);
