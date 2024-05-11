import React from "react";
import Img from "../../../img/img-inicio.jpg";
import "../../../styles/Inicio/Hero.css";

const Inicio = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Tus productos<br></br> a la vista</h1>
        <p>
          ¡Bienvenidos! Aqui podran subir sus productos
          <br></br>para ser mostrador al publico.
        </p>
        <button>Catálogo</button>
      </div>
      <img src={Img} alt="" />
    </div>
  );
};

export default Inicio;
