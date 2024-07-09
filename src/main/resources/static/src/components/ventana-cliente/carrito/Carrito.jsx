import { IMAGES_URL } from "../../../service/Configuracion";
import Button from "react-bootstrap/Button";
import { IoIosArrowBack } from "react-icons/io";
import "../../../styles/ventana-cliente/Carrito.css";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import { useContext } from "react";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import InputSpinner from "../../utils/InputSpinner.jsx";
import {IoMaleFemale} from "react-icons/io5";

const Carrito = () => {
  const {
    productosEnCarrito,
    quitarProducto,
    total,
    showCarrito,
    agregarProducto,
    setShowCarrito,
  } = useContext(carritoContext);

/*  useEffect(() => {
    let carritoActualizado = [];
    productosEnCarrito.forEach((e) => {
      productos.forEach((prodNuevo) => {
        if (prodNuevo.id === e.producto.id) {
          carritoActualizado.push({ producto: prodNuevo, cantidad: e.cantidad });
        }
      });
    });
    if (
      JSON.stringify(carritoActualizado) !== JSON.stringify(productosEnCarrito)
    ) {
      setProductosEnCarrito(carritoActualizado);
    }
  }, [productos, productosEnCarrito, setProductosEnCarrito]);*/

  const enviarPedidoPorWhatsApp = () => {
    let mensaje = 'Buenas, me gustaría ordenar los siguientes productos:\n\n';

    productosEnCarrito.forEach((elemento) => {
      mensaje += `${elemento.producto.nombre} - $${elemento.producto.precio}`;
      if (elemento.cantidad > 1) {
        mensaje += ` x${elemento.cantidad}`;
      }
      mensaje += '\n';
    });

    mensaje += `\nTotal: $${total}`;

    let numeroTelefono = '+5491164246777';
    let url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  };

  return (
    <>
      <div className={`carrito ${showCarrito && "show"}`}>
        <div className="carrito-info-titulo">
          <p onClick={() => setShowCarrito(false)}>
            <IoIosArrowBack />
          </p>
          <h1>CARRITO DE COMPRAS</h1>
        </div>
        {productosEnCarrito &&
          productosEnCarrito.map((elemento) => (
            <div className="contenedor-producto" key={uuidv4()}>
              <span className="producto-img">
                <img
                  className=""
                  src={
                    elemento.producto.imagen === "null"
                      ? ""
                      : `${IMAGES_URL}${elemento.producto.imagen}?timestamp=${new Date().getTime()}`
                  }
                  alt="Imágen-producto"
                />
              </span>
              <div className="producto-info">
                <h1>{elemento.producto.nombre}</h1>
                <p>{elemento.producto.descripcion}</p>
                <p><IoMaleFemale /> {elemento.producto.genero}</p>
                {/*<p>Tipo de producto: {elemento.producto.tipoProducto.nombre}</p>*/}
                <p>Precio x unidad: $ {elemento.producto.precio}</p>
                <InputSpinner
                  initialValue={elemento.cantidad}
                  addElement={()=>agregarProducto(elemento.producto)}
                  removeElement={()=>quitarProducto(elemento.producto)}
                />
                <div className="carrito-precio">
                  <p className="precio">Total: $ {elemento.producto.precio*elemento.cantidad}</p>
                  {/*<p className="cantidad">{elemento.cantidad > 1 ? ` x${elemento.cantidad}` : ''}</p>*/}
                </div>
              </div>
              <div className={"boton-borrar-producto-container"}>
                <button
                  onClick={() => quitarProducto(elemento.producto)}
                  className="boton-borrar-producto">
                  <BsTrash/>
                </button>
              </div>
            </div>
          ))}
        {productosEnCarrito.length >= 1 ? (
          <div className="carrito-total">
            <div className="carrito-total-precio">
              <p>Total a pagar</p>
              <p>${total}</p>
            </div>
            <Button variant="dark" onClick={enviarPedidoPorWhatsApp}>Ordenar</Button>
          </div>
        ) : (
          <p className="carrito-vacio">No hay productos en el carrito</p>
        )}
      </div>
      <div
        className={`carrito-fondo ${showCarrito ? "carrito-fondo-active" : ""}`}
        onClick={() => setShowCarrito(false)}
      ></div>
    </>
  );
};

export default Carrito;
