import { useEffect, useState} from "react";


import ModalAgregarProducto from "../modals/ModalAgregarProducto.jsx";

import "../Pantallas.css";

import {ADMIN_CANT_OBJ_TO_SHOW} from "../../../service/Configuracion.js";
import Paginador from "../../../components/paginador/Paginador.jsx";
import GestionadorObjectosAdministracion from "./content/GestionadorObjectosAdministracion.jsx";
import Navbar from "../sidebar/NavBar.jsx";
import {useSelector} from "react-redux";
import {useEntityLoaderFunction} from "../../../hooks/useEntityLoaderFunction.js";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";
import { toast } from 'sonner'
import {borrarObjeto} from "../../../service/GestionProductos.js";
import {useProductsActions} from "../../../redux/slices/products/useProductsActions.js";

const TabProductos = () => {

  const pageDetails = useSelector(store => store.pageDetails);
  const products = useSelector(store => store.products);
  const productsType = useSelector(store => store.productsType.value)

  // const { cargarEntidadSinPaginacion,actualizarEntidadConPaginacion} = useContext(entityLoaderContextProvider);
  const { cargarEntidadConPaginacion,isPageLoaded} = useEntityLoaderFunction();
  const { updateValuePageDetail } = usePageDetailsActions();
  const { resetProducts } = useProductsActions();

  const [showModalAgregar, setShowModalAgregar] = useState(false);
  // const navigate = useNavigate();
  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false); //si es agregar se borran los valores seteados

  const manejarModalAgregar = (updateValues) => {
    setShowModalAgregar(false);
    if(updateValues) {
      resetProducts();
      updateValuePageDetail("paginaActual",1);
      cargarEntidadConPaginacion("productos",0,ADMIN_CANT_OBJ_TO_SHOW,productsType);
    }
  };

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(undefined);
    setShowModalAgregar(true);
  };


  const borrarProducto = (prod) => {
    let opc = window.confirm("Está seguro que desea borrar este producto?");
    if(opc) {
      try {
        // const promise = borrarProductoGenerico("productos", prod.id, pageDetails.paginaActual, productsType);
        const promise = borrarObjeto("productos", prod.id);
        toast.promise(promise, {
          loading: "Borrando producto",
          success: () => {
            updateValuePageDetail("paginaActual", 1);
            resetProducts();
            cargarEntidadConPaginacion("productos",0,ADMIN_CANT_OBJ_TO_SHOW,productsType);
            return `Producto ${prod.nombre} borrado`;
          },
          error: 'Error al cargar productos',
        });
      }catch (e){
        console.log(e);
      }
    }
};
  const editarProducto = (prod) => {
    setEsAgregar(false);
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  //Paginacion
  const handlePaginaNueva = async (nPagina) => {
    updateValuePageDetail("paginaActual",nPagina);
    if(isPageLoaded(products.pages,nPagina-1)){
      updateValuePageDetail("paginaActual",nPagina);
      return;
    }
    if(nPagina>1){
      // actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
      await cargarEntidadConPaginacion("productos",nPagina-1,ADMIN_CANT_OBJ_TO_SHOW,productsType);
    }else{
      await cargarEntidadConPaginacion("productos",0,ADMIN_CANT_OBJ_TO_SHOW,productsType);
    }
  }

  useEffect(() => {
    handlePaginaNueva(1);
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
