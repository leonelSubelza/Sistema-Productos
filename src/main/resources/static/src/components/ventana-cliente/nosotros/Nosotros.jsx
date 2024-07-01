import React from "react";
import "../../../styles/ventana-cliente/nosotros.css";
import {useNavigate} from "react-router";

const Nosotros = () => {
  const navigate = useNavigate();

  const handleUnirse = () => {
    navigate('/login')
  }

  return (
    <div id="nosotros-link" className="nosotros">
      <h1>Nosotros</h1>
      <p>
        En Tienda Humilde nos centramos en ofrecer a nuestros clientes que
        puedan vender sus productos de la forma más humilde posible.{" "}
      </p>
      <a>
      <button onClick={handleUnirse}>Unirse</button>
      </a>
    </div>
  );
};

export default Nosotros;
