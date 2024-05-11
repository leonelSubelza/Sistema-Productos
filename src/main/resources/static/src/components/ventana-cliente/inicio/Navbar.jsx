// Componente Navbar.jsx
import React from "react";
import "../../../styles/Inicio/Navbar.css";
import logo from "../../../img/TiendaHumilde-logo.png";
import { BsFillCartFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="header-inicio">
      <div className="logo-inicio">
        <a href="/#!">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <nav className="navbar-inicio">
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Tienda</a>
          </li>
          <li>
            <a href="#">Nosotros</a>
          </li>
        </ul>
      </nav>
      <div className="button-nav-inicio">
      <button>
        <BsFillCartFill className='icon-carrito' />
        <p>0</p>
      </button>
      </div>
    </div>
  );
};

export default Navbar;
