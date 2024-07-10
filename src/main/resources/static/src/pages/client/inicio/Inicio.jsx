import React from 'react';
import Navbar from './navbar/Navbar.jsx';
import Hero from './hero/Hero.jsx';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className='inicio'>
        <Navbar/>
        <Hero/>
    </div >
  );
}

export default Inicio;