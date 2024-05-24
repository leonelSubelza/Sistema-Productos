import {useContext, useState} from "react";
import {funcionesContext} from "../../../../context/FuncionesTablaContext.jsx";
// import {funcionesClienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import CardCategoria from "./CardCategoria.jsx";

import '../../../../styles/ventana-cliente/categorias/Categorias.css'

export default function CategoriasContainer(){

  const { cantPaginasPorProducto,paginaActualProductos,setPaginaActualProductos,
    actualizarProductos,productosCargados, tiposProductos } = useContext(funcionesContext);



  const [indexCategoriaShow, setIndexCategoriaShow] = useState(0);

  return(
    <div className={'categorias-container'}>
      <h1>Categorías</h1>
      <div className={'card-categoria-container'}>
        {tiposProductos.map((tipoProducto, index) => (
          <CardCategoria
            key={index}
            show={indexCategoriaShow===index}
            handleCardSet = {()=> setIndexCategoriaShow(index)}
            tipoProducto = {tipoProducto}
          />
        ))}
      </div>

    </div>
  );
}