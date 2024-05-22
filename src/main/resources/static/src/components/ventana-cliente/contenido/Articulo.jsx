import React, { useContext } from "react";
import "../../../styles/ventana-cliente/articulo.css";
import { carritoContext } from "../../../context/ElementosCarritoContext";

const Articulo = ({ imageSource, nombreProducto, nombreCategoria, precio,producto }) => {
  const {agregarProducto,setShowCarrito} = useContext(carritoContext);


  const cargarAnimacion = (e) => {
    let divProd = e.target.closest('.card');
    divProd.classList.add('articulo-pulsado');
    setTimeout(() => {
      divProd.classList.remove('articulo-pulsado')
    },1500)
  }

  const manejarClick = (e) => {
    agregarProducto(producto);
    cargarAnimacion(e)
  }
  return (
    <div className="card">
      <div className="card-image-wrapper">
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
        <button className="card-btn btn-dark" onClick={manejarClick}>
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default Articulo;

