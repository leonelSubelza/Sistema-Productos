import {useContext, useState} from "react";
import {funcionesContext} from "../../../../context/FuncionesTablaContext.jsx";
// import {funcionesClienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import CardCategoria from "./CardCategoria.jsx";

import '../../../../styles/ventana-cliente/categorias/Categorias.css'

export default function CategoriasContainer({show,handleCategoriaShow}){

  const { tiposProductos } = useContext(funcionesContext);

  const [indexCategoriaShow, setIndexCategoriaShow] = useState(0);


  // const [paginadorProductosMostrar, setPaginadorProductosMostrar] = useState(new Map);
  /*
    const getKeyProductosFiltrados = (id) => {
      return Array.from(productosFiltrados.keys()).find(pf => pf.id === id);
    }

    const handleCardSet = (tipoProducto) => {
      let keyProdCard = getKeyProductosFiltrados(tipoProducto.id);
      if(productosFiltrados.get(keyProdCard) && productosFiltrados.get(keyProdCard).get(0)){
        let productosParaEstaCategoria = productosFiltrados.get(keyProdCard).get(0);
        //si ya hay prod filtrados para esta pag
        if(productosParaEstaCategoria){
          paginadorProductosMostrar.set(pagActual,productosParaEstaPagina);
          setPaginadorProductos(paginadorProductos);
        }
      }else{
        cargarPaginadorProductos();
      }
    }*/

  const handleCardSet = (tipoProducto) => {
    return handleCategoriaShow(tipoProducto);
  }

  return(
    <>
      <div className={`categorias-container ${show&&'show'}`}>
        <h1>Categorías</h1>
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