import React, {useContext} from "react";
import "../../../../../styles/ventana-cliente/header.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {funcionesContext} from "../../../../../context/FuncionesTablaContext.jsx";

const Filtro = ({
  productos,
  setProductosMostrados,
  nombreCategoria
}) => {

  const {tiposProductos} = useContext(funcionesContext);

  // filtra genero o tipoProducto
  const filtrar = (valor, tipo = "genero") => {
    // setProductosMostrados(productos);
    if(productos===undefined) return;
    let productosFiltrados = [];
    if(valor===''){
      return setProductosMostrados();
    }
    if (tipo === "tipoProducto") {
      // una expresion regular extricta donde solo filtra exactamnete el valor que se le pasa
      let palabra = new RegExp(`^${valor}$`, "i");
      productosFiltrados = productos.filter((producto) =>
        palabra.test(producto[tipo].nombre)
      );
    } else {
      productosFiltrados = productos.filter((producto) =>
        producto[tipo].includes(valor)
      );
    }
    return setProductosMostrados(productosFiltrados);
    // settotalProductos(productosFiltrados.length);
    // setPaginaActual(1);
  };

  return (
    <header className="header" id="producto-link">
      <h1 className="titulo-productos">{nombreCategoria}</h1>
      <Navbar
        bg="light"
        className="custom-navbar navbar-header-cliente"
      >
        <div className="container-fluid">
            <Nav className="">
              <Nav.Link
                onClick={() => filtrar("FEMENINO", "genero")}
                className="custom-nav-link"
                href="#!"
              >
                mujer
              </Nav.Link>
              <Nav.Link
                onClick={() => filtrar("MASCULINO", "genero")}
                className="custom-nav-link"
                href="#!"
              >
                hombre
              </Nav.Link>
              <Nav.Link
                onClick={() => filtrar("")}
                className="custom-nav-link"
                href="#!"
              >
                Quitar Filtro
              </Nav.Link>
            </Nav>
        </div>
      </Navbar>
    </header>
  );
};

export default Filtro;
