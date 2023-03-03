import React, { useState } from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total,setTotal] = useState(0);
  const [showCarrito,setShowCarrito] = useState(false);

  const agregarProducto = (prod) => {
    let prodEnCarrito = productosEnCarrito.find( p => p.producto.id === prod.id);
    if(!prodEnCarrito){
      productosEnCarrito.push({producto: prod,cantidad:1})
    }else{
      productosEnCarrito.map(function(p){
        console.log('prodEnCarritoid: '+p.producto.id);
        console.log('prodid: '+prod.id);
        if(p.producto.id === prod.id){
          p.cantidad = p.cantidad+1;
        }
        
        return p;
      });
    }
    setProductosEnCarrito(productosEnCarrito)
    console.log(productosEnCarrito);
    setTotal( (parseInt(total) + parseInt(prod.precio)) );
} 

  const limpiarCarrito = () => {
    setProductosEnCarrito([]);
    setTotal(0)
}

  const quitarProducto = (index,prod) => {
    productosEnCarrito[index].cantidad--;
    if(productosEnCarrito[index].cantidad<=0){
      delete(productosEnCarrito[index])
      productosEnCarrito.filter(e => e!==undefined)
    }
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
