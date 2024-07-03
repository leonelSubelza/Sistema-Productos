import {usePageDetailsActions} from "../redux/slices/pageDetails/usePageDetailsActions.js";
import {useProductsTypeActions} from "../redux/slices/productsType/useProductsTypeActions.js";
import {useProductsActions} from "../redux/slices/products/useProductsActions.js";
import {cargarObjetosConPaginacion, cargarTodosLosObjetos} from "../service/GestionProductos.js";
import {cargarTipoProductoAProductos} from "./utils/entityLoaderUtils.js";
import {loadUserDetailsValues} from "../service/GestionPageDetails.js";
import {administradorCantObjPorTabla} from "../service/Configuracion.js";

export const useEntityLoaderFunction = () => {
/*  const pageDetails = useSelector(store => store.pageDetails);

  const productsType = useSelector(store => store.productsType)*/

  const { setPageDetails,updateLoadingPageDetails } = usePageDetailsActions();
  const { updateProductsType } = useProductsTypeActions();
  const {
    addNewPageToProducts
  } = useProductsActions();

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
    try{
      const response = await cargarTodosLosObjetos(endpointName);
      if (endpointName === "tiposProductos") {
        updateLoadingPageDetails(false,"");
        updateProductsType(response)
        return response;
      }
    } catch (e){
      console.log(e)
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