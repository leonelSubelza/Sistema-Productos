import React from "react";
import "../../../styles/ventana-cliente/nosotros.css";

const Nosotros = () => {
  return (
    <div id="nosotros-link" className="nosotros">
      <h1>Nosotros</h1>
      <p>
        En Tienda Humilde nos centramos en ofrecer a nuestros clientes que
        puedan vender sus productos de la forma más humilde posible.{" "}
      </p>
      <a href="/login">
      <button>Unirse</button>
      </a>
    </div>
  );
};

export default Nosotros;
