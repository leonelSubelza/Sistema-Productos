export const getTipoProducto = (id,tiposProduct) => {
  return tiposProduct.find(tipoProd => tipoProd.id === id);
}

//A cada objeto se le asigna su objeto tipoProducto correspondiente
export const cargarTipoProductoAProductos = (productosBD,tiposProduct) => {
  if(productosBD === undefined || tiposProduct === undefined ||
    productosBD.length === 0 || tiposProduct.length === 0){
    return
  }
  let productosAux = [];
  productosBD.forEach(prod => {
    prod.tipoProducto = getTipoProducto(prod.productTypeId,tiposProduct);
    productosAux.push(prod);
  })
  return productosAux;
}