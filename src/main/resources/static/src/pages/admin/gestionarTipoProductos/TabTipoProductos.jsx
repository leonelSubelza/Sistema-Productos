import {useEffect, useState} from "react";

import "../Pantallas.css";
import ModalAgregarTipoProducto from "../modals/ModalAgregarTipoProducto.jsx";
import { toast } from 'sonner'
import "../../../components/adminTable/Tabla.css";

//Iconos
import {MdLabelImportant} from "react-icons/md";
import TablaAdministrador from "../../../components/adminTable/TablaAdministrador.jsx";
import {useSelector} from "react-redux";
import Navbar from "../sidebar/NavBar.jsx";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";
import { IMAGES_URL_PRODUCT_TYPE} from "../../../service/Configuracion.js";
import {borrarObjeto} from "../../../service/GestionProductos.js";
import {useProductsTypeActions} from "../../../redux/slices/productsType/useProductsTypeActions.js";
import {useEntityLoaderFunction} from "../../../hooks/useEntityLoaderFunction.js";
import {useProductsActions} from "../../../redux/slices/products/useProductsActions.js";

const TabTipoProducto = () => {

  const productsType = useSelector(store => store.productsType.value)

  const { updateValuePageDetail } = usePageDetailsActions();
  const { resetProductsType } = useProductsTypeActions();
  const { cargarEntidadSinPaginacion } = useEntityLoaderFunction();
  const { resetProducts } = useProductsActions();
  //modal
  const [showModalAgregar, setShowModalAgregar] = useState(false);

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false); //si es agregar se borran los valores seteados

  const manejarModalAgregar = (updateValues) => {
    setShowModalAgregar(false);
    if(updateValues) {
      updateProductsTypeAndProducts();
    }
  };

  const updateProductsTypeAndProducts = () => {
    updateValuePageDetail("paginaActual", 1);
    resetProductsType();
    resetProducts();
    cargarEntidadSinPaginacion("tiposProductos")
      // .then(productsTypeAct => {
      //   cargarEntidadConPaginacion("productos",0,ADMIN_CANT_OBJ_TO_SHOW,productsTypeAct);
      // })
  }

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(null);
    setShowModalAgregar(true);
  };

  //Abre la ventana modal con los tiposProd cargados
  const editarProducto = (tipoProd) => {
    setEsAgregar(false);
    setProdAEditar(tipoProd);
    setShowModalAgregar(true);
  };

  const borrarProducto = (prod) => {
    try {
      // const promise = borrarProductoGenerico("tiposProductos", prod.id);
      //         const promise = borrarObjeto("productos", prod.id);
      const promise = borrarObjeto("tiposProductos", prod.id);
      toast.promise(promise, {
        loading: "Borrando Tipo de Producto",
        success: () => {
          updateProductsTypeAndProducts();
          return `Tipo de Producto ${prod.nombre} borrado`;
        },
        error: 'Error al borrar Tipo de Productos ' + prod.nombre,
      });
    } catch (e) {
      console.log(e)
    }
  };

  const getTableData = (tipoProd) => {
    let urlImgProductType;
    if(tipoProd.imagen && tipoProd.imagen !== '') {
      urlImgProductType = `${IMAGES_URL_PRODUCT_TYPE}${tipoProd.imagen}?timestamp=${new Date().getTime()}`;
    }else{
      urlImgProductType = 'https://static.vecteezy.com/system/resources/previews/000/581/914/non_2x/tshirt-icon-vector-illustration.jpg';
    }
    return (
      <>
        <td>{tipoProd.id}</td>
        <td>{tipoProd.nombre}</td>
        <td className={'td-img-container'}>
          <img
            src={urlImgProductType}
            alt={'Img de tipo producto'}
          />
        </td>
      </>
    );
  }

  useEffect(() => {
    // if(!sesionIniciada){
/*    if(!pageDetails.sessionStarted) {
      navigate('/login');
      return;
    }*/
    updateValuePageDetail("paginaActual",1);
  }, []);

  return (
    <>
      <div className="contenedor-pantalla-productos">
        <Navbar/>
        <TablaAdministrador
          // show={show}
          show={true}
          titleIcon={<MdLabelImportant style={{width: "40px", height: "40px", margin: "0 0 0 5px"}}/>}
          title={"Gestion de Tipos de Productos"}
          description={"Listado de los tipos productos a los que puede pertenecer un producto"}
          addObject={agregarProd}
          editObject={editarProducto}
          removeObject={borrarProducto}
          textButtonAdd={"Agregar"}
          columnNames={["Nombre","Imágen", "Acciones"]}
          // objects={tiposProductos}
          objects={productsType}
          objectTD={getTableData}
        />
      </div>
      {/*      <PaginadorProductos
          setPaginaAnterior={handlePaginaNueva}
          setPaginaSiguiente={handlePaginaNueva}
          setPaginaActual={handlePaginaNueva}
          numeroTotalDePaginas={0}
          paginaActual={paginaActual}
          show={show}
      />*/}

      <ModalAgregarTipoProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={manejarModalAgregar}
        tipoProd={prodAEditar}
        esAgregar={esAgregar}
      />
      {/*<p>{JSON.stringify(pageDetails)}</p>*/}
    </>
  );
};
export default TabTipoProducto;
