import { useContext, useEffect, useState } from "react";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

import ModalAgregarProducto from "../modals/ModalAgregarProducto.jsx";

import "../../../styles/ventana-productos/Tabla.css";
import "../../../styles/ventana-productos/Pantallas.css";

import {administradorCantObjPorTabla} from "../../../service/Configuracion";
import Paginador from "../../utils/Paginador";
import GestionadorObjectosAdministracion from "./content/GestionadorObjectosAdministracion.jsx";
import '../../../styles/ventana-productos/Tabla.css'
import Navbar from "../sidebar/NavBar.jsx";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {entityLoaderContextProvider} from "../../../context/EntityLoaderContext.jsx";
import {useEntityLoaderFunction} from "../../../hooks/useEntityLoaderFunction.js";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";

const TabProductos = () => {

  const pageDetails = useSelector(store => store.pageDetails);
  const products = useSelector(store => store.products.value);
  const productsType = useSelector(store => store.productsType.value)

  // const { cargarEntidadSinPaginacion,actualizarEntidadConPaginacion} = useContext(entityLoaderContextProvider);
  const { cargarEntidadSinPaginacion,cargarEntidadConPaginacion,isPageLoaded} = useEntityLoaderFunction();
  const { updateValuePageDetail } = usePageDetailsActions();


  const { borrarProductoGenerico
    ,tiposProductos,
    cantPaginasPorProducto,paginaActualProductos,setPaginaActualProductos,
    actualizarProductos,productosCargados,sesionIniciada } =
    useContext(funcionesContext);

  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const navigate = useNavigate();
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
    console.log(opc)
    if(opc){
      borrarProductoGenerico("productos", prod.id);
    }
  };
  const editarProducto = (prod) => {
    console.log("se hizo click en editar")
    setEsAgregar(false);
    // prod.tipoProd = tipoProd; //Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  //Paginacion
  const handlePaginaNueva = async (nPagina) => {
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
    if(isPageLoaded(products.pages,nPagina)){
      console.log("ya esta cargada esta pagina: "+nPagina)
      updateValuePageDetail("paginaActual",nPagina);
      return;
    }else{
      console.log("esta pagina: "+nPagina+", no esta cargada,se hace la request")
    }
    if(nPagina>=1){
      // actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
      await cargarEntidadConPaginacion("productos",nPagina-1,administradorCantObjPorTabla,productsType);
    }else{
      await cargarEntidadConPaginacion("productos",0,administradorCantObjPorTabla,productsType);
    }
    // setPaginaActualProductos(nPagina);
    updateValuePageDetail("paginaActual",nPagina);
  }

  useEffect(() => {
    if (!sesionIniciada) {
      navigate('/login');
      return;
    }
    // settotalProductos(productos.length)
    if (paginaActualProductos > 1) {
      // setPaginaActualProductos(1)
      updateValuePageDetail("paginaActual",1);
      // cargarEntidadConPaginacion("productos",0,administradorCantObjPorTabla,productsType);
      // actualizarProductos("productos", 0, administradorCantObjPorTabla, tiposProductos);
    }
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
              objects={products.pages[pageDetails.paginaActual]?.products}
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
          tiposProductos={tiposProductos}
        />
        {/*<p>{JSON.stringify(products.pages[0]?.products)}</p>*/}
      </>
  );
};
export default TabProductos;
