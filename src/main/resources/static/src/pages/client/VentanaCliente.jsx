import React from "react";
import Contenido from "./contenido/Contenido.jsx";
import Footer from "./footer/Footer.jsx";
import Carrito from './cart/Carrito.jsx';
import ElementosCarritoContext from "../../context/ElementosCarritoContext.jsx";
import Inicio from "./inicio/Inicio.jsx";
import Nosotros from "./nosotros/Nosotros.jsx";

function VentanaCliente() {
  return (
      <ElementosCarritoContext>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Inicio/>
          <Contenido/>
          <Nosotros/>
          <Footer/>
          <Carrito/>
        </div>
      </ElementosCarritoContext>
  );
}

export default VentanaCliente;
