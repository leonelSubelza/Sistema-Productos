import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { FuncionesTablaContext } from "./context/FuncionesTablaContext";
// import PantallaGestionTipoProducto from './components/gestion-productos/PantallaGestionTipoProducto';
// import PantallaGestionProductos from './components/gestion-productos/PantallaGestionProductos';
import App from './App.jsx';
import store from "./redux/store.js";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const AppLayout = () => (
  <>
    <Outlet />
  </>
);

/*const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <VentanaCliente />,
      },
      {
        path: "/administrador",
        element: <PantallaAdministrador />,
      },
      // {
      //   path: "/administrador",
      //   element: <PantallaGestionProductos />,
      // },
      // {
      //   path: "/administrador/tablaTipoProductos",
      //   element: <PantallaGestionTipoProducto />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);*/
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <FuncionesTablaContext>
      {/* <RouterProvider router={router} /> */}
      <App />
    </FuncionesTablaContext>
    </Provider>
  </React.StrictMode>
);
