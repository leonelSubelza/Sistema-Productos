import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "../../../styles/ventana-productos/NavBar.css";

//Iconos
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
                <li key={index} className={item.cName}>
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