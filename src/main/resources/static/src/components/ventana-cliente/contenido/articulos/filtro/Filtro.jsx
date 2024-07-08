import React, {useState} from "react";
import "../../../../../styles/ventana-cliente/header.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import {funcionesContext} from "../../../../../context/FuncionesTablaContext.jsx";

const Filtro = ({nombreCategoria,setBusqueda}) => {

  // const {tiposProductos} = useContext(funcionesContext);
  const [nombreGeneroActive, setNombreGeneroActive] = useState('');

  const filtrar = (valor) => {
    return setBusqueda(valor);
  };

  const handleClickGenero = (nombreGenero) => {
    setNombreGeneroActive(nombreGenero);
    console.log("nombre que se setea: "+nombreGenero)
    filtrar(nombreGenero);
  }

  return (
      <header className="header">
        <h1 className="titulo-productos">{nombreCategoria}</h1>
        <Navbar
            bg="light"
            className="custom-navbar navbar-header-cliente"
        >
          <div className="container-fluid">
            <Nav className="">
              <Nav.Link
                  onClick={() => handleClickGenero("FEMENINO")}
                  className={`custom-nav-link ${nombreGeneroActive==='FEMENINO'&&'activo'}`}
                  href="#!"
              >
                mujer
              </Nav.Link>
              <Nav.Link
                  onClick={() => handleClickGenero("MASCULINO")}
                  className={`custom-nav-link ${nombreGeneroActive==='MASCULINO'&&'activo'}`}
                  href="#!"
              >
                hombre
              </Nav.Link>
              <Nav.Link
                  onClick={() => handleClickGenero("")}
                  className="custom-nav-link remove-filter-btn"
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
