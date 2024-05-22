import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import '../../../styles/Inicio/Inicio.css';

const Inicio = () => {
  return (
    <div className='inicio'>
        <Navbar/>
        <Hero/>
    </div >
  );
}

export default Inicio;