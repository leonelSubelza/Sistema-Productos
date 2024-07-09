import React, {useState} from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);
  const [totalElementosEnCarrito, setTotalElementosEnCarrito] = useState(0)

  const agregarProducto = (prod) => {
    let index = productosEnCarrito.findIndex(e => e.producto.id === prod.id);
    if(productosEnCarrito[index]){
      productosEnCarrito[index].cantidad++;
    }else{
      const objCarrito = {
        producto: prod,
        cantidad: 1
      }
      productosEnCarrito.push(objCarrito);
    }
    setProductosEnCarrito([...productosEnCarrito]);
    setTotal(total + parseInt(prod.precio));
    actualizarCantidadTotalElem();
  };

  const limpiarCarrito = () => {
    setProductosEnCarrito([]);
    setTotal(0);
    actualizarCantidadTotalElem();
  };

  const quitarProducto = (prod) => {
    let index = productosEnCarrito.findIndex(e => e.producto.id === prod.id);
    productosEnCarrito[index].cantidad -= 1;
    if (productosEnCarrito[index].cantidad <= 0) {
      setProductosEnCarrito(productosEnCarrito.filter(e => e.producto.id !== prod.id));
    } else {
      setProductosEnCarrito([...productosEnCarrito]);
    }
    setTotal(total - parseInt(prod.precio));
    actualizarCantidadTotalElem();
  };

  const actualizarCantidadTotalElem = () => {
    const totalElem = productosEnCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalElementosEnCarrito(totalElem);
  }

  return (
    <carritoContext.Provider
      value={{
        productosEnCarrito,
        totalElementosEnCarrito,
        setProductosEnCarrito,
        agregarProducto,
        limpiarCarrito,
        quitarProducto,
        total,
        showCarrito,
        setShowCarrito,
        // calcularTotalProductos,
      }}
    >
      {children}
    </carritoContext.Provider>
  );
};

export default ElementosCarritoContext;
