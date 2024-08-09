import React, {useContext, useEffect, useState} from "react";
import "./Navbar.css";
import { carritoContext } from "../../../../context/ElementosCarritoContext.jsx";
import Cart from "./svg/Cart.jsx";
import {useSelector} from "react-redux";

const DEFAULT_PAGE_NAME = 'Tienda Humilde';
const DEFAULT_PAGE_SLOGAN = 'Humildad Ante Todo';

const Navbar = () => {
  const { setShowCarrito, totalElementosEnCarrito } = useContext(carritoContext);
  const pageDetails = useSelector((store) => store.pageDetails);
  const [pageName, setPageName] = useState('');
  const [pageSlogan, setPageSlogan] = useState('');

  useEffect(() => {
    if(!pageDetails.pageName || pageDetails.pageName==='') {
      setPageName(DEFAULT_PAGE_NAME);
    }else {
      setPageName(pageDetails.pageName);
    }
    if(!pageDetails.slogan || pageDetails.slogan===''){
      setPageSlogan(DEFAULT_PAGE_SLOGAN);
    }else{
      setPageSlogan(pageDetails.slogan);
    }
  }, []);

  return (
    <div className="header-inicio">
      <div className="logo-inicio">
        <a href="/#!">
          {/* <img src={logo} alt="Logo" /> */}
          <h1>{pageName}</h1>
          {pageSlogan !== '' &&
            <p>{pageSlogan}</p>}
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
