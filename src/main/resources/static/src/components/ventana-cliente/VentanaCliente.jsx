import React from "react";
import Contenido from "./contenido/Contenido";
import Footer from "./footer/Footer";
import Carrito from './carrito/Carrito';
import ElementosCarritoContext from "../../context/ElementosCarritoContext";
import Inicio from "./inicio/Inicio";
import Nosotros from "./nosotros/Nosotros";

function VentanaCliente() {
  return (
    <ElementosCarritoContext>
      {/*<Navigate to={`/`} />*/}
      <div style={{display: 'flex', flexDirection: 'column' }}>
        <Inicio/>
        <Contenido />
        <Nosotros/>
        <Footer />
        <Carrito />
      </div>
    </ElementosCarritoContext>
  );
}

export default VentanaCliente;
