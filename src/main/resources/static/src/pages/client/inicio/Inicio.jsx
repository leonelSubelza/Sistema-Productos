import React from 'react';
import Navbar from './navbar/Navbar.jsx';
import Hero from './hero/Hero.jsx';
import './Inicio.css';

import {IMAGES_URL_PAGEDETAILS} from "../../../service/Configuracion.js";
import {useSelector} from "react-redux";

const Inicio = () => {
    const pageDetails = useSelector((store) => store.pageDetails);


  return (
    <div className='inicio' style={{backgroundImage: `url(${`${IMAGES_URL_PAGEDETAILS}${pageDetails.frontPageImage}?timestamp=${new Date().getTime()}`})`}}>
        <Navbar/>
        <Hero/>
    </div >
  );
}

export default Inicio;