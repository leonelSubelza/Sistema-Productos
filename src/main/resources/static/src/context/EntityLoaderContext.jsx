import React from "react";
import {cargarObjetosConPaginacion, cargarTodosLosObjetos} from "../service/GestionProductos.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {useSelector} from "react-redux";

export const entityLoaderContextProvider = React.createContext();

export function EntityLoaderContext({ children }) {

  // const products = useSelector(store => store.products.value);
  const productsType = useSelector(store => store.productsType.value)

  const { updateProductsType,updateProductTypeIsDataLoading } = useProductsTypeActions();
  const { updateProducts,updateProductsIsDataLoading } = useProductsActions();


  const getTipoProducto = (id,tiposProduct) => {
    return tiposProduct.find(tipoProd => tipoProd.id === id);
  }

  //A cada objeto se le asigna su objeto tipoProducto correspondiente
  const cargarTipoProductoAProductos = (productosBD,tiposProduct) => {
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

  //Actualiza la entidad tipoProducto y Producto que devuelven ambas un array y no son con paginacion
  const cargarEntidad = async (endpointName, tiposProductos) => {
    //Cargamos todos los tipoProductos
    let location = window.location.href;
    // setMensajeSpinner("Actualizando Tabla");
    if (location.includes('/administrador')) {
      if (endpointName === "tiposProductos") {
        updateProductTypeIsDataLoading(true);
      }
      if (endpointName === "productos") {
        updateProductsIsDataLoading(true);
      }
    }
    try{
      const response = await cargarTodosLosObjetos(endpointName);
      if (endpointName === "tiposProductos") {
        updateProductTypeIsDataLoading(false)
        updateProductsType(response)
        return response;
      }
      // console.log("se cargan todos los productos, productsTYPE:")
      // console.log(productsType)
      if (productsType) {
        updateProductsIsDataLoading(false);
        const productosCargadosCompletos = cargarTipoProductoAProductos(response.content, tiposProductos);
        updateProducts(productosCargadosCompletos);
        return productosCargadosCompletos;
      }
    } catch (e){
      console.log(e)
    }
/*    cargarTodosLosObjetos(endpointName)
      .then(response => {
        // setShowSpinner(false);
        // setTiposProductos(response);
        if (endpointName === "tiposProductos") {
          updateProductTypeIsDataLoading(false)
          updateProductsType(response)
          return response;
        }
        console.log("se cargan todos los productos, productsTYPE:")
        console.log(productsType)
        if (productsType) {
          updateProductsIsDataLoading(false);
          const productosCargadosCompletos = cargarTipoProductoAProductos(response.content, productsType);
          updateProducts(productosCargadosCompletos);
          return productosCargadosCompletos;
        }

      })
      .catch(e => {
        console.log(e)
      })*/
  };

//ACA UNIR LUEGO LO DE CARGAR PRODUCTOS CON PAGINACION


  return (
    <entityLoaderContextProvider.Provider
    value={{
      cargarEntidad
    }}
    >
      {children}
    </entityLoaderContextProvider.Provider>
  )
}