import React, { useContext, useEffect, useState } from "react";
import Header from "./header/Header";
import Contenido from "./contenido/Contenido";
import Footer from "./footer/Footer";
import { funcionesContext } from "../../context/FuncionesTablaContext";

function VentanaCliente() {
  const { actualizarTablaGenerica } = useContext(funcionesContext);
  const [productos, setProductos] = useState([]);
  const [productosMostrados, setProductosMostrados] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);
  const [listaProductos] = useState([]);
  const [totalProductos, settotalProductos] = useState(listaProductos.length);
  const [productosPorPagina] = useState(8);
  const [paginaActual, setPaginaActual] = useState(1);

  const cargarValores = (productosBD) => {
    let productosPiolas = [];
    let tiposProductos = [];
    productosBD.forEach((tipoProd) => {
      let tipoProductoObj = {
        id: tipoProd.id,
        nombre: tipoProd.nombre,
      };
      tipoProd.productos.forEach((prod) => {
        prod.tipoProducto = tipoProductoObj;
        productosPiolas.push(prod);
      });

      tiposProductos.push(tipoProductoObj);
    });
    setTiposProductos(tiposProductos);
    setProductos(productosPiolas);
    setProductosMostrados(productosPiolas);

    setPaginaActual(1);
    settotalProductos(productosPiolas.length);
  };

  useEffect(() => {
    actualizarTablaGenerica("tiposProductos").then((res) => {
      cargarValores(res);
    });
  }, [actualizarTablaGenerica]);

  return (
    <div>
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
    </div>
  );
}

export default VentanaCliente;
