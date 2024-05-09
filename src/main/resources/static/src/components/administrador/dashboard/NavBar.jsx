import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "../../../styles/ventana-productos/NavBar.css";

//Iconos
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

function Navbar({showTablaProductos}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleNavbarItemClick = (item) => {
    console.log(item);
    if(item.title === 'Tipos de Productos'){
      console.log("se hizo click en Tipoproductos");
      return showTablaProductos(false);
    }
    if(item.title === 'Productos'){
      console.log("se hizo click en productos");
      return showTablaProductos(true);
    }
  }

  return (
    <>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <p onClick={showSidebar} ><FaBars /></p>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <p> <AiOutlineCloseCircle /> </p>
              </Link>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={()=>handleNavbarItemClick(item)}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default Navbar;