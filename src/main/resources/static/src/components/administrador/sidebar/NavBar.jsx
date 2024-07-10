import React, {useState} from "react";
import { SideBarData } from "./SideBarData";
import "./NavBar.css";

//Iconos
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";

function Navbar() {
    const [showItems, setShowItems] = useState(false);
    const navigate = useNavigate();
    // const { setSesionIniciada } = useContext(funcionesContext);
    const { updateValuePageDetail } = usePageDetailsActions();

    const handleNavbarItemClick = (item) => {
        // onNavbarItemClick(item.title);
        if(item.title === "Salir"){
            updateValuePageDetail("sessionStarted",false)
        }

        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <>
            <nav className={'navbar-container'}>
                <div className={'navbar-brand'}>
                    <div className="navbar-brand-item">
                        {/*<p><IoStorefront /></p>*/}
                        <p onClick={() => navigate('/')}> Tienda Humilde </p>
                    </div>
                    <div className="navbar-brand-item navbar-brand-item-actions">
                        <p className={`${!showItems && 'show'}`} onClick={() => setShowItems(true)}><IoMenu /></p>
                        <p className={`${showItems && 'show'}`} onClick={() => setShowItems(false)}><IoMdClose /></p>
                    </div>
                </div>
                <ul className={`nav-menu-items ${showItems && 'show'}`}>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName} onClick={() => handleNavbarItemClick(item)}>
                                {item.icon}
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
