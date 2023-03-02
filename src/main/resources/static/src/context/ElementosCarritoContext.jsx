import React, { useState } from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total,setTotal] = useState(0);
  const [showCarrito,setShowCarrito] = useState(false);

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

  const quitarProducto = (index,prod) => {
    delete(productosEnCarrito[index])
    productosEnCarrito.filter(e => e!==undefined)
    setProductosEnCarrito(productosEnCarrito)
    setTotal(total-prod.precio)
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
          setShowCarrito
        }}
      >
        {children}
      </carritoContext.Provider>
    </>
  );
};
export default ElementosCarritoContext;
