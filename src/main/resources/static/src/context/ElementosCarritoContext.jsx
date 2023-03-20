import React, { useState } from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);

  const agregarProducto = (prod) => {
    let indiceCarrito = productosEnCarrito.findIndex( e => e.producto.id === prod.id);
    if (indiceCarrito === -1) {
      productosEnCarrito.push({ producto: prod, cantidad: 1 });
    } else {
      productosEnCarrito[indiceCarrito].cantidad += 1; 
    }
    setProductosEnCarrito(productosEnCarrito);
    setTotal(parseInt(total) + parseInt(prod.precio));
    
  };

  const limpiarCarrito = () => {
    setProductosEnCarrito([]);
    setTotal(0);
  };

  const quitarProducto = (index, prod) => {
    productosEnCarrito[index].cantidad -=1;
    if (productosEnCarrito[index].cantidad <= 0) {
      setProductosEnCarrito(productosEnCarrito.filter(e => e.producto.id !== prod.id ));  
    }else{
      setProductosEnCarrito(productosEnCarrito)
    }
    setTotal(total - parseInt(prod.precio));
  };
  return (
    <>
      <carritoContext.Provider
        value={{
          productosEnCarrito,
          setProductosEnCarrito,
          agregarProducto,
          limpiarCarrito,
          quitarProducto,
          total,
          showCarrito,
          setShowCarrito,
        }}
      >
        {children}
      </carritoContext.Provider>
    </>
  );
};
export default ElementosCarritoContext;
