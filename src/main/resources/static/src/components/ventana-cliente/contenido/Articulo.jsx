import React, { useContext } from "react";
import "../../../styles/ventana-cliente/articulo.css";

const Articulo = ({ imageSource, nombreProducto, nombreCategoria, precio,producto }) => {

  const cargarAnimacion = (e) => {
    let divProd = e.target.closest('.card.text-center.bg-ligth');
    divProd.classList.add('articulo-pulsado');
    setTimeout(() => {
      divProd.classList.remove('articulo-pulsado')
    },1500)
  }

  return (
    <div className="card text-center bg-ligth">
      <div className="overflow">
        <img
          src={imageSource}
          alt="a wallpaper"
          className="card-img-top"
        />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{nombreProducto}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{nombreCategoria}</h6>
        <p className="custom-precio card-text text-secondary  display-5 font-weight-bold">
          {precio ? precio : "Sin precio"}
        </p>
      </div>
    </div>
  );
};

export default Articulo;

