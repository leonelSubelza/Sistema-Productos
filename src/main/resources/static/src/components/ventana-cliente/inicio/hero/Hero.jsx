import React from "react";
import "./Hero.css";

const Inicio = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Tus productos<br></br> a la vista</h1>
        <p>
          ¡Bienvenidos! Aqui podran subir sus productos
          <br></br>para ser mostrador al publico.
        </p>
        <a href="#producto-link">
        <button>Catálogo</button>
        </a>
      </div>

    </div>
  );
};

export default Inicio;
