import { URLImagenes } from "../../../service/Configuracion";
import Button from "react-bootstrap/Button";
import { IoIosArrowBack } from "react-icons/io";
import "../../../styles/ventana-cliente/Carrito.css";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import { useCallback, useContext, useEffect } from "react";
import { TiDelete } from "react-icons/ti";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

const Carrito = () => {
  const {productosEnCarrito,setProductosEnCarrito,limpiarCarrito,quitarProducto,total,showCarrito,setShowCarrito} = useContext(carritoContext);
  const { productos } = useContext(funcionesContext);

  const actualizarProductosEnCarrito = useCallback(() => {
    console.log('se actualizaron los prod o.O')
    let prodActualizados = [];
    productosEnCarrito.forEach( prod => {
      productos.forEach(prodNuevo => {
        if(prodNuevo.id === prod.id){
          prodActualizados.push(prodNuevo);
        }
      })
    } )
    setProductosEnCarrito(prodActualizados);
  },[productos,productosEnCarrito,setProductosEnCarrito])

  useEffect(()=>{
    
  },[])

  return (
    <>
    <div className={`carrito ${showCarrito ? 'carrito-show' : ''}`}>
      <div className="carrito-info-titulo">
        <p onClick={()=>setShowCarrito(false)}>
          <IoIosArrowBack />
        </p>
        <h1>CARRITO DE COMPRAS</h1>
      </div>

      {productosEnCarrito &&
       productosEnCarrito.map((prod,index) => (
        <div className="contenedor-producto" key={index}>
          {prod.nombre === 'Mierda asquerosa' ? console.log('imgNombre: '+prod.imagen) : ''}
          <img
          className="producto-img"
            src={
              prod.imagen === "null"
                ? ""
                : `${URLImagenes}${prod.imagen}?timestamp=${new Date().getTime()}`
            }
            alt="Imágen-producto"            
          />
          <div className="producto-info">
            <h1>{prod.nombre}</h1>
            <p>Descripcion: {prod.descripcion}</p>
            <p style={{color:'#D30034'}}>Precio: ${prod.precio}</p>
            <p>Género: {prod.genero}</p>
            <p>Tipo producto:{prod.tipoProducto.nombre}</p>
          </div>
          <p onClick={()=>quitarProducto(index,prod)} className='boton-borrar-producto'><TiDelete /></p>
        </div>
      ))}

      {productosEnCarrito.length>0 ? 
      <div className="carrito-total">
      <div className="carrito-total-precio">
        <p>Total</p>
        <p>${total}</p>
      </div>
      <Button variant="dark">IR A PAGAR</Button>
    </div>
      :
       <p className="carrito-vacio">No hay productos en el carrito</p>}
      
    </div>
    <div className={`carrito-fondo ${showCarrito ? 'carrito-fondo-active' : ''}`} onClick={()=>setShowCarrito(false)}></div>
    </>
  );
};
export default Carrito;
