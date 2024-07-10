import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import '../../../styles/Inicio/Inicio.css';
import {IMAGES_URL_PAGEDETAILS} from "../../../service/Configuracion.js";
import {useSelector} from "react-redux";

const Inicio = () => {
    const pageDetails = useSelector((store) => store.pageDetails);


  return (
    <div className='inicio'   style={{backgroundImage: `url(${`${IMAGES_URL_PAGEDETAILS}${pageDetails.frontPageImage}?timestamp=${new Date().getTime()}`})`}}>
        <Navbar/>
        <Hero/>
    </div >
  );
}

export default Inicio;