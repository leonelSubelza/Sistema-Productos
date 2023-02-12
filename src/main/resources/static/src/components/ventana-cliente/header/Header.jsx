import React from 'react';
import logo from "../../../img/TiendaHumilde-logo.png";
import '../../../styles/ventana-cliente/header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  return (
    <header className='header'>

      <div className='cabecera'>
        <div className='logo'>
          <a href="/#"><img src={logo} alt="Logo" /></a>
        </div>
      </div>

      <Navbar bg="light" className='custom-navbar' expand="md">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className='custom-nav-link' href="#inicio">inicio</Nav.Link>

              <NavDropdown className='custom-nav-link' title="productos" id="basic-nav-dropdown">
                <NavDropdown.Item className='custom-nav-link-item' href="#action/3.1">Remeras</NavDropdown.Item>
                <NavDropdown.Item className='custom-nav-link-item' href="#action/3.2">Camperas</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className='custom-nav-link' href="#hombre">hombre</Nav.Link>
              <Nav.Link className='custom-nav-link' href="#mujer">mujer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>
  );
}

export default Header;