import {useSelector} from "react-redux";
import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {cargarObjetosConPaginacion, cargarTodosLosObjetos} from "../service/GestionProductos.js";
import {cargarTipoProductoAProductos} from "./utils/entityLoaderUtils.js";
import {loadUserDetailsValues} from "../service/GestionPageDetails.js";
import {administradorCantObjPorTabla} from "../service/Configuracion.js";

export const useEntityLoaderFunction = () => {
  const pageDetails = useSelector(store => store.pageDetails);
  const products = useSelector(store => store.products);
  const productsType = useSelector(store => store.productsType)

  const { setPageDetails,updateValuePageDetail,updateLoadingPageDetails } = usePageDetailsActions();
  const { updateProductsType,updateProductTypeIsDataLoading } = useProductsTypeActions();
  const {
    updateProducts,
    updateProductsIsDataLoading,
  } = useProductsActions();

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

  const cargarEntidadConPaginacion =  async (direccion,page,size, tiposProductos) => {
    try{
      updateProductsIsDataLoading(true);
      const response = await cargarObjetosConPaginacion(direccion,page,size);
      if(direccion === 'productos'){
        const productosCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
        const pageToSave = {
          nroPag: page,
          products: productosCargadosCompletos
        }
        console.log(pageToSave)
        updateProducts(response.totalPages,pageToSave)
        updateProductsIsDataLoading(false)
        return productosCargadosCompletos;
      }

    }catch(e) {
      updateProductsIsDataLoading(true)
      console.log(e)
    }
  };

  const cargarPageDetails = async () => {
    updateLoadingPageDetails(true);
    await loadUserDetailsValues()
      .then(res => {
        updateLoadingPageDetails(false);
        setPageDetails(res[0])
      })
      .catch(e => {
        console.log(e)
      })
  }

  const cargarTipoProductoYTodosLosProductos = async (pagActual) => {
    const tiposProductosAct = await cargarEntidadSinPaginacion('tiposProductos');
    await cargarEntidadConPaginacion(
      "productos",
      0,
      administradorCantObjPorTabla,
      tiposProductosAct);
  }

  const cargarValoresIniciales = async () => {
    await cargarPageDetails();
    await cargarTipoProductoYTodosLosProductos(0);
  }

  const isPageLoaded = (productsPages,nroPag) => {
    return productsPages[nroPag];
    // return productsPages.find( pag => pag.nroPag === nroPag);
  }

  return {
    cargarPageDetails,
    cargarTipoProductoYTodosLosProductos,
    cargarEntidadConPaginacion,
    cargarEntidadSinPaginacion,
    cargarValoresIniciales,
    isPageLoaded
  };
}