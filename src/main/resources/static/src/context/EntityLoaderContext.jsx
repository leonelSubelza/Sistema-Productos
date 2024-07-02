import React, {useEffect} from "react";
import {cargarObjetosConPaginacion, cargarTodosLosObjetos} from "../service/GestionProductos.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {useSelector} from "react-redux";
import {cargarTipoProductoAProductos} from "../hooks/utils/entityLoaderUtils.js";
import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {loadUserDetailsValues} from "../service/GestionPageDetails.js";
import {administradorCantObjPorTabla} from "../service/Configuracion.js";

export const entityLoaderContextProvider = React.createContext();

export function EntityLoaderContext({ children }) {

  const pageDetails = useSelector(store => store.pageDetails);
  const products = useSelector(store => store.products);
  const productsType = useSelector(store => store.productsType)

  const { setPageDetails,updateValuePageDetail } = usePageDetailsActions();
  const { updateProductsType,updateProductTypeIsDataLoading } = useProductsTypeActions();
  const {
    updateProducts,
    updateProductsIsDataLoading,
  } = useProductsActions();




/*  const getTipoProducto = (id,tiposProduct) => {
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
  }*/

  //Actualiza la entidad tipoProducto
  const cargarEntidadSinPaginacion = async (endpointName) => {
    //Cargamos todos los tipoProductos
    let location = window.location.href;
    // setMensajeSpinner("Actualizando Tabla");
    if (location.includes('/administrador')) {
      if (endpointName === "tiposProductos") {
        updateProductTypeIsDataLoading(true);
      }
    }
    try{
      const response = await cargarTodosLosObjetos(endpointName);
      if (endpointName === "tiposProductos") {
        updateProductTypeIsDataLoading(false)
        updateProductsType(response)
        return response;
      }
    } catch (e){
      console.log(e)
    }
  };

//ACA UNIR LUEGO LO DE CARGAR PRODUCTOS CON PAGINACION


  const actualizarEntidadConPaginacion =  async (direccion,page,size, tiposProductos) => {
    // let location = window.location.href;
/*    if(location.includes('/administrador') || location.includes('/administrador/tablaTipoProductos')){
      setMensajeSpinner("Actualizando Tabla");
      setShowSpinner(true);
    }*/
    //Cargamos algunos productos
    try{
      updateProductsIsDataLoading(true)
      const response = await cargarObjetosConPaginacion(direccion,page,size);
      if(direccion === 'productos'){
        const productosCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
        // setCantPaginasPorProducto(response.totalPages);
        // setProductos(productosCargadosCompletos);
        updateProducts(response.totalPages,productosCargadosCompletos)
        updateProductsIsDataLoading(false)
        // productosCargados.set(page+1,productosCargadosCompletos);
        // setProductosCargados(productosCargados)
        return productosCargadosCompletos;
      }

    }catch(e) {
      updateProductsIsDataLoading(true)
      console.log(e)
    }
  };

  const cargarPageDetails = () => {
    loadUserDetailsValues()
      .then(res => {
        setPageDetails(res[0])
      })
      .catch(e => {
        console.log(e)
      })
  }

  const actualizarValores = async (pagActual) => {
    const tiposProductosAct = await cargarEntidadSinPaginacion('tiposProductos');
    await actualizarEntidadConPaginacion(
      "productos",
      0,
      administradorCantObjPorTabla,
      tiposProductosAct);
  }

  useEffect(() => {
    cargarPageDetails();
    actualizarValores(0)
  }, []);

  return (
    <entityLoaderContextProvider.Provider
    value={{
      cargarEntidadSinPaginacion,
      actualizarEntidadConPaginacion
    }}
    >
      {children}
    </entityLoaderContextProvider.Provider>
  )
}