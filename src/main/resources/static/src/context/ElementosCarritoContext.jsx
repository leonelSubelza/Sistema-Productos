import React, {useState, useMemo, useEffect} from "react";

export const carritoContext = React.createContext();

const ElementosCarritoContext = ({ children }) => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);
  const [totalElementosEnCarrito, setTotalElementosEnCarrito] = useState(0)

  const getProdDeCarrito = (prod) => {
    return productosEnCarrito.find(elemCarrito => elemCarrito.producto.id === prod.id);
  }

  const agregarProducto = (prod) => {
    let indiceCarrito = productosEnCarrito.findIndex(e => e.producto.id === prod.id);
    let elemCarrito = getProdDeCarrito(prod);
    if(elemCarrito){
      elemCarrito.cantidad++;
    }else{
      productosEnCarrito.push({ producto: prod, cantidad: 1 });
    }
    setProductosEnCarrito(productosEnCarrito)
    setTotal(parseInt(total) + parseInt(prod.precio));
    actualizarCantidadTotalElem();
  };

  const limpiarCarrito = () => {
    setProductosEnCarrito([]);
    setTotal(0);
    actualizarCantidadTotalElem();
  };

  const quitarProducto = (index, prod) => {
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

  // const calcularTotalProductos = useMemo(() => {

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
