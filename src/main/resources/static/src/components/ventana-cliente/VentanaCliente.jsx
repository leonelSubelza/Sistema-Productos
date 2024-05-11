import React, { useContext, useEffect, useState } from "react";
import Header from "./header/Header";
import Contenido from "./contenido/Contenido";
import Footer from "./footer/Footer";
import { funcionesContext } from "../../context/FuncionesTablaContext";
import Carrito from './carrito/Carrito';
import ElementosCarritoContext from "../../context/ElementosCarritoContext";
import Inicio from "./inicio/Inicio";

function VentanaCliente() {
  const { productos, tiposProductos } = useContext(funcionesContext);
  //const [productos, setProductos] = useState([]);
  const [productosMostrados, setProductosMostrados] = useState([]);
  //const [tiposProductos, setTiposProductos] = useState([]);
  const [listaProductos] = useState([]);
  const [totalProductos, settotalProductos] = useState(listaProductos.length);
  const [productosPorPagina] = useState(8);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setProductosMostrados(productos);
    setPaginaActual(1);
    settotalProductos(productos.length);
  }, [productos]);

  return (
    <ElementosCarritoContext>
      <div style={{display: 'flex', flexDirection: 'column' }}>
        <Inicio/>
        <Header
          productos={productos}
          setProductosMostrados={setProductosMostrados}
          tiposProductos={tiposProductos}
          settotalProductos={settotalProductos}
          setPaginaActual={setPaginaActual}
        />
        <Contenido
          productos={productos}
          productosMostrados={productosMostrados}
          setProductosMostrados={setProductosMostrados}
          tiposProductos={tiposProductos}
          totalProductos={totalProductos}
          settotalProductos={settotalProductos}
          productosPorPagina={productosPorPagina}
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
        />
        <Footer />
        <Carrito />
      </div>
    </ElementosCarritoContext>
  );
}

export default VentanaCliente;
