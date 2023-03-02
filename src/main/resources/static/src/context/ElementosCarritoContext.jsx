import React, { useState } from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total,setTotal] = useState(0);

  const agregarProducto = (prod) => {
    //if(!productosEnCarrito.includes(prod)){
      productosEnCarrito.push(prod)
        setProductosEnCarrito(productosEnCarrito)
    //}else{
     //   console.log('ya se posee elemento en carrito');
    //}
    setTotal( (parseInt(total) + parseInt(prod.precio)) );
} 

  const limpiarCarrito = () => {
    setProductosEnCarrito([]);
    setTotal(0)
}

  const quitarProducto = (prodABorrar) => {
    setProductosEnCarrito(productosEnCarrito.filter(producto => producto.id === prodABorrar.id))
    setTotal(total-prodABorrar.precio)
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
          total
        }}
      >
        {children}
      </carritoContext.Provider>
    </>
  );
};
export default ElementosCarritoContext;
