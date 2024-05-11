import { useEffect, useState, useContext } from "react";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

import { Table, Button, Container } from "reactstrap";

import ModalAgregarTipoProducto from "./ModalAgregarTipoProducto";

import "../../../styles/ventana-productos/Tabla.css";

//Iconos
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { MdLabelImportant } from "react-icons/md";
// import PaginadorTipoProductos from "./PaginadorTipoProductos";
// import PaginadorProductos from "../gestionarProductos/PaginadorProductos";
import {administradorCantObjPorTabla} from "../../../service/Configuracion";
import TablaAdministrador from "../../utils/TablaAdministrador";
import {GiClothes} from "react-icons/gi";

const TablaTipoProducto = ({show}) => {
  const { borrarProductoGenerico,tiposProductos,actualizarTipoProductos } =
    useContext(funcionesContext);

  //variables de paginacion
  // const [totalTipoProductos, setTotalTiposProductos] = useState(tiposProductos.length);
  // const [tipoProductosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
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
    borrarProductoGenerico("tiposProductos", prod.id);
  };

  const handlePaginaNueva = (nPagina) => {
    actualizarTipoProductos()
    setPaginaActual(nPagina);
  }

  const getTableData = (tipoProd) => {
    return (
      <>
        <td>{tipoProd.id}</td>
        <td>{tipoProd.nombre}</td>
      </>
      );

  }

/*  useEffect(() => {
    setTotalTiposProductos(tiposProductos.length);
    setpaginaActual(1)
  }, [tiposProductos]);*/

  return (
    <>
      <TablaAdministrador
        show={show}
        titleIcon={<MdLabelImportant style={{ width: "40px", height: "40px", margin: "0 0 0 5px" }}/>}
        title={"Gestion de Tipos de Productos"}
        description={"Listado de los tipos productos a los que puede pertenecer un producto"}
        addObject={agregarProd}
        editObject={editarProducto}
        removeObject={borrarProducto}
        textButtonAdd={"Agregar"}
        columnNames={["Nombre","Acciones"]}
        objects={tiposProductos}
        objectTD={getTableData}
      />

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
    </>
  );
};
export default TablaTipoProducto;
