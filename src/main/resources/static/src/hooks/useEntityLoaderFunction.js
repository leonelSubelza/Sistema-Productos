import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {cargarObjetosConPaginacion, cargarTodosLosObjetos, loadFilteredProducts} from "../service/GestionProductos.js";
import {
  cargarTipoProductoAProductos, generatePageToSave,
  genereteFilteredProductByTypeKey,
  getKeyFilteredProductsByType
} from "./utils/entityLoaderUtils.js";
import {loadUserDetailsValues} from "../service/pageDetailsService.js";
import { ADMIN_CANT_OBJ_TO_SHOW } from "../service/Configuracion.js";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import {
  useFilteredProductsActions
} from "../redux/slices/filteredProductsByType/useFilteredProductsActions.js";

export const useEntityLoaderFunction = () => {
  const pageDetails = useSelector(store => store.pageDetails);
  /*
    const productsType = useSelector(store => store.productsType)*/
  const filteredProductsByType = useSelector(store => store.filteredProductsByType);

  const { setPageDetails,updateLoadingPageDetails } = usePageDetailsActions();
  const { updateProductsType } = useProductsTypeActions();
  const { addNewPageToProducts } = useProductsActions();
  const { addPageToFilteredProductByType } = useFilteredProductsActions();

  //Carga Productos Filtrados solo por tipoProducto. Posiblemente lo saque
  const cargarPaginaPorTipoProducto = async (values,nroPagina,size,tiposProductos) => {
    let location = window.location.href;
    let toastId;
    if(location.includes('/administrador')){
      toastId = toast.loading("Actualizando filteredProductsType")
    }
    try{
/*      const response = await cargarObjetosConPaginacion(
        "productos/byProductType",
        nroPagina,
        CLIENT_CANT_OBJ_TO_SHOW,
        idTipoProducto
      );*/
      const response = loadFilteredProducts(values,nroPagina,size);
      toast.dismiss(toastId);
      let prodCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
      let keyFilteredProductByType = getKeyFilteredProductsByType(idTipoProducto,filteredProductsByType);
      if (!keyFilteredProductByType) {
        keyFilteredProductByType = genereteFilteredProductByTypeKey(tiposProductos,idTipoProducto,response.totalPages);
      }
      const pageToSave = generatePageToSave(prodCargadosCompletos,nroPagina);
      addPageToFilteredProductByType(keyFilteredProductByType,nroPagina,pageToSave);
      return prodCargadosCompletos;
    }catch (e) {
      toast.dismiss(toastId);
      toast.error("Error al actualizar filteredProductsType",{
        duration: Infinity,
        position: 'top-right',
      })
      console.log(e)
    }
  }

  //Actualiza la entidad tipoProducto
  const cargarEntidadSinPaginacion = async (endpointName) => {
    //Cargamos todos los tipoProductos
    // let location = window.location.href;
    // setMensajeSpinner("Actualizando Tabla");
    // if (location.includes('/administrador')) {
      if (endpointName === "tiposProductos") {
        updateLoadingPageDetails(true,"Actualizando productsType");
      }
    // }
    let location = window.location.href;
    let toastId;
    if(location.includes('/administrador')){
      toastId = toast.loading("Actualizando productsType")
    }
    try{
      const response = await cargarTodosLosObjetos(endpointName);
      toast.dismiss(toastId);
      if (endpointName === "tiposProductos") {
        updateLoadingPageDetails(false,"");
        updateProductsType(response)
        return response;
      }
    } catch (e){
      console.log(e);
      toast.dismiss(toastId);
      toast.error("Error al actualizar",{
        duration: Infinity,
        position: 'top-right',
      })
    }
  };

  const cargarEntidadConPaginacion =  async (direccion,page,size, tiposProductos) => {
    let location = window.location.href;
    let toastId;
    if(location.includes('/administrador')){
      toastId = toast.loading("Actualizando products")
    }
    try{
      updateLoadingPageDetails(true,"Actualizando products");
      const response = await cargarObjetosConPaginacion(direccion,page,size);
      toast.dismiss(toastId);
      if(direccion === 'productos'){
        const productosCargadosCompletos = cargarTipoProductoAProductos(response.content,tiposProductos);
        const pageToSave = {
          nroPag: page,
          products: productosCargadosCompletos
        }
        // console.log("se guardan prod de pag: "+page)
        // console.log(pageToSave)
        // updateProducts(response.totalPages,pageToSave)
        addNewPageToProducts(page,response.totalPages,pageToSave);
        updateLoadingPageDetails(false,"");
        return productosCargadosCompletos;
      }

    }catch(e) {
      updateLoadingPageDetails(false,"");
      console.log(e)
      toast.dismiss(toastId);
      toast.error("Error al actualizar",{
        duration: Infinity,
        position: 'top-right',
      })
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
    // return productsPages.find( pag => pag.nroPag === nroPag);
  }

  return {
    cargarPageDetails,
    cargarTipoProductoYTodosLosProductos,
    cargarEntidadConPaginacion,
    cargarEntidadSinPaginacion,
    cargarValoresIniciales,
    isPageLoaded,
    cargarPaginaPorTipoProducto
  };
}