import {useContext, useEffect, useState} from "react";
import {clienteContext} from "../../../../context/FuncionesClienteContext.jsx";
import Articulos from "../articulos/Articulos.jsx";

export default function CardCategoria({show,handleCardSet,tipoProducto}) {

  const {productosFiltrados,cargarProductosFiltrados} = useContext(clienteContext);

  const [pagActual, setPagActual] = useState(0);

  const [paginadorProductos, setPaginadorProductos] = useState(new Map());

  const handleOnClickCard = () => {
    return handleCardSet();
  }

  const getKeyProductosFiltrados = () => {
    return Array.from(productosFiltrados.keys()).find(pf => pf.id === tipoProducto.id);
  }

  //AGREGAR LOGICA PARA HACER NUEVAS REQUEST PARA ESTE TIPOPROD

  const cargarPaginadorProductos = () => {
    cargarProductosFiltrados(pagActual,tipoProducto.id)
      .then(response => {
        console.log("productos por cargar")
        console.log(response)
        paginadorProductos.set(pagActual,response.get(pagActual))
        setPaginadorProductos(paginadorProductos)

        setTotalPaginas(response.totalPages);
      })
  }

  useEffect(() => {
    console.log(paginadorProductos)
    if(show){
      let keyProdCard = getKeyProductosFiltrados();
      if(productosFiltrados.get(keyProdCard) && productosFiltrados.get(keyProdCard).get(pagActual)){
        let productosParaEstaPagina = productosFiltrados.get(keyProdCard).get(pagActual);
        console.log("productospara esta pagina")
        console.log(productosParaEstaPagina)
        //si ya hay prod filtrados para esta pag
        if(productosParaEstaPagina){
          paginadorProductos.set(pagActual,productosParaEstaPagina);
          setPaginadorProductos(paginadorProductos);
        }
      }else{
        cargarPaginadorProductos();
      }
    }
  });

  return (
    <>
      <div className={`card-categoria-container-item`} onClick={handleOnClickCard}>
        <p>{tipoProducto.nombre}</p>
  {/*      <div style={{border:"2px solid red",width:"100px"}}>
          {paginadorProductos&&paginadorProductos.size>0 && paginadorProductos.get(pagActual)!==undefined
            && paginadorProductos.get(pagActual).map( (p,index) => (
              <p key={index}>{p.nombre}</p>
            ))}
        </div>*/}
      </div>
{/*    <Articulos
      show={show}
      productosMostrados={paginadorProductos.get(pagActual)}
    />*/}
    </>
  );
}
/*
* Si hago click en una card se  debe hacer la request para este tipoProducto,
* Si la este producto ya se esta mostrando entonces debe tener una funcion para manejar qué pagina mostrar con el paginador
* Se debe contar con una variable que sea un map que represente este tipoProducto
* */