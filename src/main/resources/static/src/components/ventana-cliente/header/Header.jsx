import React from 'react';
import logo from "../../../img/TiendaHumilde-logo.png";
import '../../../styles/header.css';

const Header = () => {
  return (
    <header className='header'>

      <div className='cabecera'>
        <div className='logo'>
          <a href="/#"><img src={logo} alt="Logo" /></a>
        </div>
        <div className='desblegable'>
          <button className='desplegable-inicio-sesion'><i class="bi bi-gear"></i></button>
        </div>
      </div>

      <nav className='nav'>
        <a href="/#">Inicio</a>
        <a href="/#">Productos</a>
        <a href="/#">Contacto</a>
      </nav>

    </header>
  );
}

export default Header;