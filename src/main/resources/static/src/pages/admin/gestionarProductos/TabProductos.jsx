import {useContext, useEffect, useState} from "react";

import { funcionesContext } from "../../../context/FuncionesTablaContext.jsx";

import ModalAgregarProducto from "../modals/ModalAgregarProducto.jsx";

// import "../../../styles/ventana-productos/Tabla.css";
import "../Pantallas.css";

import {ADMIN_CANT_OBJ_TO_SHOW} from "../../../service/Configuracion.js";
import Paginador from "../../../components/paginador/Paginador.jsx";
import GestionadorObjectosAdministracion from "./content/GestionadorObjectosAdministracion.jsx";
import Navbar from "../sidebar/NavBar.jsx";
import {useSelector} from "react-redux";
import {useEntityLoaderFunction} from "../../../hooks/useEntityLoaderFunction.js";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";
import { toast } from 'sonner'

const TabProductos = () => {

  const pageDetails = useSelector(store => store.pageDetails);
  const products = useSelector(store => store.products);
  const productsType = useSelector(store => store.productsType.value)

  // const { cargarEntidadSinPaginacion,actualizarEntidadConPaginacion} = useContext(entityLoaderContextProvider);
  const { cargarEntidadConPaginacion,isPageLoaded} = useEntityLoaderFunction();
  const { updateValuePageDetail } = usePageDetailsActions();

  const { borrarProductoGenerico,
    /*    tiposProductos,
      cantPaginasPorProducto,paginaActualProductos,setPaginaActualProductos,
       actualizarProductos,productosCargados,*/
    // sesionIniciada
  } =
    useContext(funcionesContext);

  const [showModalAgregar, setShowModalAgregar] = useState(false);
  // const navigate = useNavigate();
  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false); //si es agregar se borran los valores seteados

  const manejarModalAgregar = () => {
    setShowModalAgregar(false);
  };

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(undefined);
    setShowModalAgregar(true);
  };
  const borrarProducto = (prod) => {
    let opc = window.confirm("Estáis seguro que desáis borrar vuestro producto?");

    if(opc) {
/*      const toastId = toast.loading("Borrando producto");
      borrarProductoGenerico("productos", prod.id, pageDetails.paginaActual, productsType)
        .then(() => {
          updateValuePageDetail("paginaActual", 1);
          toast.success(`Producto ${prod.nombre} borrado con éxito`);
          toast.dismiss(toastId);
        })
        .catch(e => {
          console.log(e);
          toast.dismiss(toastId);
          toast.error('Error al borrar producto ' + prod.nombre);
        })*/
      try {
        const promise = borrarProductoGenerico("productos", prod.id, pageDetails.paginaActual, productsType);
        toast.promise(promise, {
          loading: "Borrando producto",
          success: () => {
            updateValuePageDetail("paginaActual", 1);
            return `Producto ${prod.nombre} borrado`;
          },
          error: 'Error al cargar productos',
        });
      }catch (e){
        console.log(e);
        // toast.error('Error al borrar producto ' + prod.nombre);
      }
    }
};
  const editarProducto = (prod) => {
    setEsAgregar(false);
    // prod.tipoProd = tipoProd; //Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  //Paginacion
  const handlePaginaNueva = async (nPagina) => {
    console.log("nueva pag"+nPagina)
    updateValuePageDetail("paginaActual",nPagina);
    // if(productosCargados.has(nPagina)){
    //   setPaginaActualProductos(nPagina);
    //   return;
    // }
    // if(nPagina>=1){
    //   actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
    // }else{
    //   actualizarProductos("productos",0,administradorCantObjPorTabla, tiposProductos)
    // }
    // setPaginaActualProductos(nPagina);
    if(isPageLoaded(products.pages,nPagina-1)){
      console.log("existe pagina cargada")
      updateValuePageDetail("paginaActual",nPagina);
      return;
    }
    console.log("no existe pagina cargada, se hace la busqueda");
    if(nPagina>1){
      // actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
      await cargarEntidadConPaginacion("productos",nPagina-1,ADMIN_CANT_OBJ_TO_SHOW,productsType);
    }else{
      await cargarEntidadConPaginacion("productos",0,ADMIN_CANT_OBJ_TO_SHOW,productsType);
    }
/*    const promise = () => new Promise((resolve) => setTimeout(() => {
      resolve({ name: 'Sonner' })
    }, 2000));*/

/*    toast.promise(promise, {
      loading: pageDetails.loadingMessage,
      success: (data) => {
        return `Productos cargados`;
      },
      error: 'Error al cargar productos',
    });*/

    // setPaginaActualProductos(nPagina);
  }

/*  const [toastId, setToastId] = useState(0|'')
    useEffect(() => {
      if(pageDetails.loading) {
        setToastId(toast.loading(pageDetails.loadingMessage));
      }else{
        toast.dismiss(toastId);
      }
    }, [pageDetails]);*/

  useEffect(() => {
    // if (!sesionIniciada) {
/*    if(!pageDetails.sessionStarted) {
      navigate('/login');
      return;
    }*/
    // settotalProductos(productos.length)
    // if (paginaActualProductos > 1) {
      // setPaginaActualProductos(1)
    handlePaginaNueva(1);
      // cargarEntidadConPaginacion("productos",0,administradorCantObjPorTabla,productsType);
      // actualizarProductos("productos", 0, administradorCantObjPorTabla, tiposProductos);
    // }
/*    if (productsType && productsType.length < 1 &&
      products.totalPag === 0) {
      cargarEntidadSinPaginacion('tiposProductos')
        .then(response => {
          cargarEntidadConPaginacion("productos", 0, administradorCantObjPorTabla, response);
        })
        .then(res => {
          console.log(products)
        })
    }*/
  }, []);

    return (
      <>
        <div className="contenedor-pantalla-productos">
          <Navbar />
          {/*<div className={`tabla-productos-container ${show && 'show'}`}>*/}
          <div className={`tabla-productos-container show`}>
            <GestionadorObjectosAdministracion
              // show={show}
              show={true}
              titulo={"Gestion de Productos"}
              objectName={`Producto`}
              // objects={productosCargados.get(paginaActualProductos)}
              objects={products.pages[pageDetails.paginaActual-1]?.products}
              addObject={agregarProd}
              editObject={editarProducto}
              removeObject={borrarProducto}
            />

            <Paginador
              setPaginaAnterior={handlePaginaNueva}
              setPaginaSiguiente={handlePaginaNueva}
              setPaginaActual={handlePaginaNueva}
              // numeroTotalDePaginas={cantPaginasPorProducto}
              numeroTotalDePaginas={products.totalPag}
              // paginaActual={paginaActualProductos}
              paginaActual={pageDetails.paginaActual}
              show={true}
              color={"#0d6efd"}
            />
          </div>
        </div>

        <ModalAgregarProducto
          mostrarVentana={showModalAgregar}
          cerrarVentana={manejarModalAgregar}
          prod={prodAEditar}
          esAgregar={esAgregar}
          // tiposProductos={tiposProductos}
          tiposProductos={productsType}
        />
      </>
  );
};
export default TabProductos;
