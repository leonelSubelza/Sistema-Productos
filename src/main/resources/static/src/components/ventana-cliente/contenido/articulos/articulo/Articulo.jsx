import React, { useContext } from "react";
import "./articulo.css";
import { carritoContext } from "../../../../../context/ElementosCarritoContext.jsx";

const Articulo = ({ imageSource, nombreProducto, nombreCategoria, precio,producto }) => {
  const {agregarProducto} = useContext(carritoContext);


  const cargarAnimacion = (e) => {
    let divProd = e.target.closest('.card');
    divProd.classList.add('articulo-pulsado');
    setTimeout(() => {
      divProd.classList.remove('articulo-pulsado')
    },1500)
  }

  const manejarClick = (e) => {
    e.preventDefault();
    agregarProducto(producto);
    cargarAnimacion(e);
  }
  return (
    <div className="card">
      <div className="card-image">
        <img
          src={imageSource}
          alt={nombreProducto || "Producto sin imagen"}
          className="card-img-top"
        />
      </div>
      <div className="card-body">
        <h4 className="card-title">{nombreProducto}</h4>
        <h6 className="card-subtitle">{nombreCategoria}</h6>
        <p className="card-price">
          {precio ? `$ ${precio}` : "Sin precio"}
        </p>
        <div className="card-button">
        <button className="card-btn btn-dark" onClick={manejarClick}>
          AÑADIR AL CARRITO
        </button>
        </div>
      </div>
    </div>
  );
};

export default Articulo;

