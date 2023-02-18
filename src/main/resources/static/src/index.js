import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import VentanaCliente from './components/ventana-cliente/VentanaCliente';

import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
import PantallaGestionTipoProducto from './components/gestion-productos/PantallaGestionTipoProducto';
import PantallaGestionProductos from './components/gestion-productos/PantallaGestionProductos';

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
