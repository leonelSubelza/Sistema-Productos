import React, { useState } from "react";
import "../../../styles/ventana-cliente/articulo.css";

const Articulo = ({ imageSource, nombreProducto, nombreCategoria, precio }) => {
  const [imageUrl, setImageUrl] = useState(imageSource);

  const handleImageError = (e) => {
    e.preventDefault();
    setImageUrl("");
  };
  return (
    <div className="card text-center bg-ligth">
      <div className="overflow">
        <img
          src={imageUrl}
          alt="a wallpaper"
          className="card-img-top"
          onError={(e) => {
            handleImageError(e);
          }}
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

