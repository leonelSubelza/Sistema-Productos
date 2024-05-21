// Componente Navbar.jsx
import React, { useContext } from "react";
import "../../../styles/Inicio/Navbar.css";
import logo from "../../../img/TiendaHumilde-logo.png";
import { BsFillCartFill } from "react-icons/bs";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import Cart from "../../svg/Cart";

const Navbar = () => {
  const { setShowCarrito } = useContext(carritoContext);
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
      <button onClick={() => setShowCarrito(true)}>
        <Cart/>
        <p>0</p>
      </button>
      </div>
    </div>
  );
};

export default Navbar;
