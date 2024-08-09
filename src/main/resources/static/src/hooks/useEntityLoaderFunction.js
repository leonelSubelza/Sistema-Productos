import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {
  cargarObjetosConPaginacion,
  cargarTodosLosObjetos,
  loadFilteredProducts
} from "../service/GestionProductos.js";
import {
  cargarTipoProductoAProductos, generatePageToSave,genereteFilteredProductKey
} from "./utils/entityLoaderUtils.js";
import {loadUserDetailsValues} from "../service/pageDetailsService.js";
import { ADMIN_CANT_OBJ_TO_SHOW } from "../service/Configuracion.js";
import {
  useFilteredProductsActions
} from "../redux/slices/filteredProductsByType/useFilteredProductsActions.js";

export const useEntityLoaderFunction = () => {

  const { setPageDetails,updateLoadingPageDetails } = usePageDetailsActions();
  const { updateProductsType } = useProductsTypeActions();
  const { addNewPageToProducts } = useProductsActions();
  const { addPageToFilteredProductByType } = useFilteredProductsActions();

  //Carga Productos Filtrados para articulos. Campos debe tener si o si un tipoProducto
  const cargarPaginaProductosFiltrados = async (campos,nroPagina,size,tiposProductos) => {
    try{
      updateLoadingPageDetails(true,"Actualizando filteredProductsType");
      const response = await loadFilteredProducts(campos,nroPagina,size);
      updateLoadingPageDetails(false,"");
      // toast.dismiss(toastId);
      let prodCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
      let keyFilteredProduct = genereteFilteredProductKey(tiposProductos,campos.tipoProducto,response.totalPages);
      // }
      const pageToSave = generatePageToSave(prodCargadosCompletos,nroPagina);

      keyFilteredProduct.pages[nroPagina] = pageToSave;
      addPageToFilteredProductByType(keyFilteredProduct,nroPagina,pageToSave);
      return keyFilteredProduct;
    }catch (e) {
      updateLoadingPageDetails(false,"");
      console.log(e)
    }
  }

  //Actualiza la entidad tipoProducto
  const cargarEntidadSinPaginacion = async (endpointName) => {
    //Cargamos todos los tipoProductos
      if (endpointName === "tiposProductos") {
        updateLoadingPageDetails(true,"Actualizando productsType");
      }
    try{
      const response = await cargarTodosLosObjetos(endpointName);
      // toast.dismiss(toastId);
      if (endpointName === "tiposProductos") {
        updateLoadingPageDetails(false,"");
        updateProductsType(response)
        return response;
      }
    } catch (e){
      console.log(e);
      updateLoadingPageDetails(false,"");
    }
  };

  const cargarEntidadConPaginacion =  async (direccion,page,size, tiposProductos) => {
    try{
      updateLoadingPageDetails(true,"Actualizando products");
      const response = await cargarObjetosConPaginacion(direccion,page,size);
      if(direccion === 'productos'){
        const productosCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
        const pageToSave = {
          nroPag: page,
          products: productosCargadosCompletos
        }
        addNewPageToProducts(page,response.totalPages,pageToSave);
        updateLoadingPageDetails(false,"");
        return productosCargadosCompletos;
      }

    }catch(e) {
      updateLoadingPageDetails(false,"");
      console.log(e)
    }
  };

  const cargarPageDetails = async () => {
    updateLoadingPageDetails(true,"Actualizando datos de la página");
    await loadUserDetailsValues()
      .then(res => {
        updateLoadingPageDetails(false,'');
        setPageDetails(res[0])
      })
      .catch(e => {
        updateLoadingPageDetails(false,"");
        console.log(e)
      })
  }

  const cargarTipoProductoYTodosLosProductos = async (pagActual) => {
    const tiposProductosAct = await cargarEntidadSinPaginacion('tiposProductos');
    await cargarEntidadConPaginacion(
      "productos",
      pagActual,
      ADMIN_CANT_OBJ_TO_SHOW,
      tiposProductosAct);
  }

  const cargarValoresIniciales = async () => {
    await cargarPageDetails();
    await cargarTipoProductoYTodosLosProductos(0);
  }

  const isPageLoaded = (productsPages,nroPag) => {
    return productsPages[nroPag];
  }

  return {
    cargarPageDetails,
    cargarTipoProductoYTodosLosProductos,
    cargarEntidadConPaginacion,
    cargarEntidadSinPaginacion,
    cargarValoresIniciales,
    isPageLoaded,
    cargarPaginaProductosFiltrados
  };
}