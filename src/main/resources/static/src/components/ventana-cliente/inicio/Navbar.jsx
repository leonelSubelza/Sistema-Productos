import React, { useContext } from "react";
import "../../../styles/Inicio/Navbar.css";
import logo from "../../../img/TiendaHumilde-logo.png";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import Cart from "../../svg/Cart";

const Navbar = () => {
  const { setShowCarrito, calcularTotalProductos } = useContext(carritoContext);

  return (
    <div className="header-inicio">
      <div className="logo-inicio">
        <a href="/#!">
          {/* <img src={logo} alt="Logo" /> */}
          <h1>Tienda Humilde</h1>
          <p>Humildad Ante Todo</p>
        </a>
      </div>
      <nav className="navbar-inicio">
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#producto-link">Tienda</a>
          </li>
          <li>
            <a href="#nosotros-link">Nosotros</a>
          </li>
        </ul>
      </nav>
      <div className="button-nav-inicio">
        <button onClick={() => setShowCarrito(true)}>
          <Cart />
          <p>{calcularTotalProductos}</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
