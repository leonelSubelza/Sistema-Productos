import React, { useContext } from 'react';
// import logo from "../../../img/TiendaHumilde-logo.png";
import '../../../styles/ventana-cliente/header.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillCartFill } from "react-icons/bs";
import { carritoContext } from '../../../context/ElementosCarritoContext';

const Header = ({ productos, setProductosMostrados, tiposProductos, settotalProductos, setPaginaActual }) => {

  const { setShowCarrito } = useContext(carritoContext);

  // filtra genero o tipoProducto
  const filtrar = (valor, tipo = "genero") => {
    setProductosMostrados(productos)
    let productosFiltrados = [];
    if (tipo === "tipoProducto") {
      // una expresion regular extricta donde solo filtra exactamnete el valor que se le pasa
      let palabra = new RegExp(`^${valor}$`, 'i');
      productosFiltrados = productos.filter(producto => palabra.test(producto[tipo].nombre));
    } else {
      productosFiltrados = productos.filter(producto => producto[tipo].includes(valor));
    }
    console.log();
    setProductosMostrados(productosFiltrados)
    settotalProductos(productosFiltrados.length)
    setPaginaActual(1);
  }

  return (
    <header className='header'>

      {/* <div className='cabecera'>
        <div onClick={() => { filtrar("") }} className='logo'>
          <a href="/#!"><img src={logo} alt="Logo" /></a>
        </div>
      </div> */}

      <Navbar bg="light" className='custom-navbar navbar-header-cliente' expand="md">
        <div className='container-fluid' style={{ background: "white" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto div-a-centrar">
              <Nav.Link onClick={() => filtrar("")} className='custom-nav-link' href="#!">Restaurar</Nav.Link>

              <NavDropdown className='custom-nav-link' title="productos" id="basic-nav-dropdown">

                {tiposProductos && tiposProductos.map((tipoProducto) => (
                  <NavDropdown.Item onClick={() => filtrar(tipoProducto.nombre, "tipoProducto")} key={tipoProducto.id} className='custom-nav-link-item' href="#!">{tipoProducto.nombre}</NavDropdown.Item>
                ))}

              </NavDropdown>

              <Nav.Link onClick={() => filtrar("MASCULINO", "genero")} className='custom-nav-link' href="#!">hombre</Nav.Link>
              <Nav.Link onClick={() => filtrar("FEMENINO", "genero")} className='custom-nav-link' href="#!">mujer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div>
            <p className='carrito-txt' onClick={() => setShowCarrito(true)}>Carrito <BsFillCartFill className='icon-carrito' /></p>
          </div>

          <Nav.Link className='custom-nav-link ml-auto' href="/login">
            Inicio sesión
          </Nav.Link>
        </div>
      </Navbar>

    </header>
  );
}

export default Header;