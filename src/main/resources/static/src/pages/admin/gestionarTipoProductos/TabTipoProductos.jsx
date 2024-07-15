import {useEffect, useState, useContext} from "react";

import {funcionesContext} from "../../../context/FuncionesTablaContext.jsx";
import "../Pantallas.css";
import ModalAgregarTipoProducto from "../modals/ModalAgregarTipoProducto.jsx";
import { toast } from 'sonner'
import "../../../components/adminTable/Tabla.css";

//Iconos
import {MdLabelImportant} from "react-icons/md";
// import PaginadorTipoProductos from "./PaginadorTipoProductos";
// import PaginadorProductos from "../gestionarProductos/PaginadorProductos";
import TablaAdministrador from "../../../components/adminTable/TablaAdministrador.jsx";
import {useSelector} from "react-redux";
import Navbar from "../sidebar/NavBar.jsx";
// import {useNavigate} from "react-router";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";
import {IMAGES_URL_PRODUCT_TYPE} from "../../../service/Configuracion.js";

const TabTipoProducto = () => {

  // const tiposProductos = useSelector(store => store.productsType.value)
  // const navigate = useNavigate();
  const {
    borrarProductoGenerico,
    // tiposProductos,
    // actualizarTipoProductos,
    // sesionIniciada
  } =
    useContext(funcionesContext);

  // const pageDetails = useSelector(store => store.pageDetails);
  const productsType = useSelector(store => store.productsType.value)

  const { updateValuePageDetail } = usePageDetailsActions();

  //variables de paginacion
  // const [totalTipoProductos, setTotalTiposProductos] = useState(tiposProductos.length);
  // const [tipoProductosPorPagina] = useState(5);
  // const [paginaActual, setPaginaActual] = useState(1);
  // const ultimoIndex = paginaActual * tipoProductosPorPagina;
  // const primerIndex = ultimoIndex - tipoProductosPorPagina;

  //modal
  const [showModalAgregar, setShowModalAgregar] = useState(false);

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false); //si es agregar se borran los valores seteados

  const manejarModalAgregar = () => {
    setShowModalAgregar(false);
  };

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
      const promise = borrarProductoGenerico("tiposProductos", prod.id);
      toast.promise(promise, {
        loading: "Borrando Tipo de Producto",
        success: () => {
          updateValuePageDetail("paginaActual", 1);
          return `Tipo de Producto ${prod.nombre} borrado`;
        },
        error: 'Error al borrar Tipo de Productos ' + prod.nombre,
      });
    } catch (e) {
      console.log(e)
      // toast.error('Error al borrar Tipo de Productos ' + prod.nombre);
    }
/*    borrarProductoGenerico("tiposProductos", prod.id)
      .then(() => {
        updateValuePageDetail("paginaActual", 1);
        // resetProducts();
      })
      .catch(e => {
        console.log(e)
      })*/

    /*
    *       try {
        const promise = borrarProductoGenerico("productos", prod.id, pageDetails.paginaActual, productsType);
        toast.promise(promise, {
          loading: "Borrando producto",
          success: (data) => {
            updateValuePageDetail("paginaActual", 1);
            return `Producto ${JSON.stringify(data)} borrado`;
          },
          error: 'Error al cargar productos',
        });
      }catch (e){
        console.log(e);
        toast.error('Error al borrar producto ' + prod.nombre);
    * */


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
