import React, {useContext} from "react";
import "./Navbar.css";
import { carritoContext } from "../../../../context/ElementosCarritoContext.jsx";
import Cart from "./svg/Cart.jsx";

const Navbar = () => {
  const { setShowCarrito, totalElementosEnCarrito } = useContext(carritoContext);

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
          <p>{totalElementosEnCarrito}</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
