import {useContext, useState} from "react";
import {funcionesContext} from "../../../../context/FuncionesTablaContext.jsx";
// import {funcionesClienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import CardCategoria from "./CardCategoria.jsx";

import '../../../../styles/ventana-cliente/categorias/Categorias.css'

export default function CategoriasContainer({show,handleCategoriaShow}){

  const { tiposProductos } = useContext(funcionesContext);

  const [indexCategoriaShow, setIndexCategoriaShow] = useState(0);

  const handleCardSet = (tipoProducto) => {
    return handleCategoriaShow(tipoProducto);
  }

  return(
    <>
      <div className={`categorias-container ${show&&'show'}`}>
        <h1 style={{paddingTop:"60px"}}>Categorías</h1>
        <div className={'card-categoria-container'}>
          {tiposProductos.map((tipoProducto, index=1) => (
            <CardCategoria
              key={index}
              show={indexCategoriaShow===tipoProducto.id}
              handleCardSet = {()=> handleCardSet(tipoProducto)}
              tipoProducto = {tipoProducto}
            />
          ))}
        </div>
      </div>
  </>
  );
}