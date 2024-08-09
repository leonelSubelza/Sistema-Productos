import React, {useEffect, useState} from 'react';
import Navbar from './navbar/Navbar.jsx';
import Hero from './hero/Hero.jsx';
import './Inicio.css';
import imageFondo from '../../../img/imageFondo.png'
import {IMAGES_URL_PAGEDETAILS} from "../../../service/Configuracion.js";
import {useSelector} from "react-redux";

const Inicio = () => {
  const pageDetails = useSelector((store) => store.pageDetails);
  const [urlBackground, setUrlBackground] = useState('');

  useEffect(() => {
    if(!pageDetails.frontPageImage || pageDetails.frontPageImage==='') {
      setUrlBackground(imageFondo);
    }else{
      setUrlBackground(IMAGES_URL_PAGEDETAILS+pageDetails.frontPageImage+"?"+"timestamp="+new Date().getTime());
    }
  }, []);

  return (
    <div className='inicio'
         style={{backgroundImage: `url(${urlBackground})`}}>
      <Navbar/>
      <Hero/>
    </div>
  );
}

export default Inicio;