import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/PantallaGestionProductos.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//ROUTES DAHSBOARD
import Navbar from "./Dashboard/NavBar";

import TablaProductos from "./TablaProductos";
import TablaTipoProducto from "./TablaTipoProductos";
import MensajeToast from "./MensajeToast";

//PARA EL DASHBOARD
//import Containerr from "react-bootstrap/Container";
//import Nav from "react-bootstrap/Nav";

export default function PantallaGestionProductos() {
  const [showTablaProductos, setTablaProductos] = useState(true);

  const AppLayout = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <TablaProductos />,
        },
        {
          path: "/tablaTipoProductos",
          element: <TablaTipoProducto />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <MensajeToast
        color={"Light"}
        msjHeader={"ZAPATERIA HUMILDE"}
        msjBody={"ERROR"}
      />
    </>
  );
}
