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

export const getKeyFilteredProductsByType = (idTipoProducto,filteredProductByType) => {
  return filteredProductByType.find(filteredProductByTypeKey => filteredProductByTypeKey.id===idTipoProducto);
}

export const genereteFilteredProductByTypeKey = (tiposProductos,idTipoProducto,totalPages) => {
  const productTypeToAdd = tiposProductos.find(tipoProducto => tipoProducto === idTipoProducto);
  return {
    id: productTypeToAdd.id,
    nombre: productTypeToAdd.nombre,
    totalPag: totalPages,
    pages: []
  };
}

export const generatePageToSave = (productsToSave, nroPag) => {
  return {
    nroPag: nroPag,
    products:productsToSave
  }
}

export const getPagFilteredProduct = (idTipoProducto,filteredProducts) => {
  return filteredProducts.find(filteredProduct => filteredProduct.id === idTipoProducto);
}