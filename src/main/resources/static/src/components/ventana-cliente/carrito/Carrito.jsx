import { IMAGES_URL } from "../../../service/Configuracion";
import Button from "react-bootstrap/Button";
import { IoIosArrowBack } from "react-icons/io";
import "../../../styles/ventana-cliente/Carrito.css";
import { carritoContext } from "../../../context/ElementosCarritoContext";
import { useContext, useEffect } from "react";
import { BsTrash } from "react-icons/bs";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

const Carrito = () => {
  const {
    productosEnCarrito,
    setProductosEnCarrito,
    limpiarCarrito,
    quitarProducto,
    total,
    showCarrito,
    setShowCarrito,
  } = useContext(carritoContext);
  const { productos } = useContext(funcionesContext);

  useEffect(() => {
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
  }, [productos, productosEnCarrito, setProductosEnCarrito]);

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
      <div className={`carrito ${showCarrito ? "carrito-show" : ""}`}>
        <div className="carrito-info-titulo">
          <p onClick={() => setShowCarrito(false)}>
            <IoIosArrowBack />
          </p>
          <h1>CARRITO DE COMPRAS</h1>
        </div>
        {productosEnCarrito &&
          productosEnCarrito.map((elemento, index) => (
            <div className="contenedor-producto" key={index}>
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
                <p>Descripcion: {elemento.producto.descripcion}</p>
                <p>Género: {elemento.producto.genero}</p>
                <p>Tipo de producto: {elemento.producto.tipoProducto.nombre}</p>
                <div className="carrito-precio">
                  <p className="precio">Precio: ${elemento.producto.precio}</p>
                  <p className="cantidad">{elemento.cantidad > 1 ? ` x${elemento.cantidad}` : ''}</p>
                </div>
              </div>
              <p
                onClick={() => quitarProducto(index, elemento.producto)}
                className="boton-borrar-producto"
              >
                <BsTrash />
              </p>
            </div>
          ))}
        {productosEnCarrito.length >= 1 ? (
          <div className="carrito-total">
            <div className="carrito-total-precio">
              <p>Total</p>
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
