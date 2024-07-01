import React, { useState} from 'react';
import Articulos from './articulos/Articulos.jsx';
import '../../../styles/ventana-cliente/contenido.css';
import CategoriasContainer from "./categorias/CategoriasContainer.jsx";

const Contenido = () => {

  const [tipoProductoMostrar, setTipoProductoMostrar] = useState(undefined);

  const [showCategorias, setShowCategorias] = useState(true)

  const handleCategoriaShow = (tipoProducto) => {
    setTipoProductoMostrar(tipoProducto)
    setShowCategorias(false);
  }

  const handleShowArticulos = () => {
    setShowCategorias(true);
  }

  return (
    <section className='section' id="producto-link">
      <CategoriasContainer
        show={showCategorias}
        handleCategoriaShow = {handleCategoriaShow}
      />
      <Articulos
        show={!showCategorias}
        tipoProductoAMostrar={tipoProductoMostrar}
        handleShowArticulos={handleShowArticulos}
      />
    </section>
  );
}

export default Contenido;