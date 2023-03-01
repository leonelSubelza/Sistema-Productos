import { URLImagenes } from "../../../service/Configuracion";
import Button from "react-bootstrap/Button";
import { IoIosArrowBack } from "react-icons/io";
import "../../../styles/ventana-cliente/Carrito.css";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import { useContext, useEffect } from "react";
import { TiDelete } from "react-icons/ti";

const Carrito = ({ show, cerrarVentana }) => {

  const {productosEnCarrito,limpiarCarrito,quitarProducto,total} = useContext(carritoContext);
    useEffect(()=>{
        console.log(productosEnCarrito.map( a => console.log('asdffads')));
    },[productosEnCarrito])

  return (
    <div className={`carrito ${show ? 'carrito-show' : ''}`}>
      <div className="carrito-info-titulo">
        <p onClick={cerrarVentana}>
          <IoIosArrowBack />
        </p>
        <h1>CARRITO DE COMPRAS</h1>
      </div>

      {productosEnCarrito &&
       productosEnCarrito.map((prod,index) => (
        <div className="contenedor-producto" key={index}>
          <img
          className="producto-img"
            src={
              prod.imagen === "null"
                ? ""
                : `${URLImagenes}${prod.imagen}?timestamp=${window.timestamp}`
            }
            alt="Imágen-producto"            
          />
          <div className="producto-info">
            <h1>{prod.nombre}</h1>
            <p>Descripcion: {prod.descripcion}</p>
            <p>Precio: ${prod.precio}</p>
            <p>Género: {prod.genero}</p>
            <p>Tipo producto:{prod.tipoProducto.nombre}</p>
          </div>
          <p onClick={quitarProducto} className='boton-borrar-producto'><TiDelete /></p>
        </div>
      ))}
    
      <div className="carrito-total">
        <div className="carrito-total-precio">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
      <Button variant="dark">IR A PAGAR</Button>
    </div>
  );
};
export default Carrito;
