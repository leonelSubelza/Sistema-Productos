import { useContext, useEffect, useState } from "react";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

import ModalAgregarProducto from "./ModalAgregarProducto";

import "../../../styles/ventana-productos/Tabla.css";

//Iconos
/*import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";*/
import { GiClothes } from "react-icons/gi";
import PaginadorProductos from "../../utils/Paginador";
import {administradorCantObjPorTabla} from "../../../service/Configuracion";
import TablaAdministrador from "../../utils/TablaAdministrador";
import Paginador from "../../utils/Paginador";

const TablaTipoProducto = ({show}) => {
  const { borrarProductoGenerico,
    productos,setProductos,tiposProductos,
    cantPaginasPorProducto,paginaActualProductos,setPaginaActualProductos,
    actualizarProductos,productosCargados, setProductosCargados } =
    useContext(funcionesContext);

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
  const borrarProducto = (prod) => {
    borrarProductoGenerico("productos", prod.id);
  };
  const editarProducto = (prod) => {
    setEsAgregar(false);
    // prod.tipoProd = tipoProd; //Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  //Paginacion
  const handlePaginaNueva = (nPagina) => {
    if(productosCargados.has(nPagina)){
      setPaginaActualProductos(nPagina);
      return;
    }
    if(nPagina>=1){
      actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
    }else{
      actualizarProductos("productos",0,administradorCantObjPorTabla, tiposProductos)
    }
    setPaginaActualProductos(nPagina);
  }

  const getTableData = (prod) => {
    return(<>
          <td className={"table-data"}>{prod.id}</td>
          <td className={"table-data"}>{prod.nombre}</td>
          <td className={"table-data"}>{prod.descripcion}</td>
          <td className={"table-data"} style={{ color: "green" }}>$ {prod.precio}</td>
          <td className={"table-data"}>{prod.tipoProducto.nombre}</td>
          <td className={"table-data"}>{prod.genero}</td>
          <td className={"table-data"}>{prod.imagen}</td>
        </>
    )
  }

  useEffect(() => {
    // settotalProductos(productos.length)
    if(paginaActualProductos>1){
      setPaginaActualProductos(1)
      actualizarProductos("productos",0,administradorCantObjPorTabla, tiposProductos);
    }
  },[]);

    return (
    <>
      <TablaAdministrador
          show={show}
          titleIcon={<GiClothes style={{ height: "100%", width: "4rem" }} />}
          title={"Gestion de Productos"}
          description={"Listado de los productos cargados en el sistema"}
          addObject={agregarProd}
          editObject={editarProducto}
          removeObject={borrarProducto}
          textButtonAdd={"Agregar Producto"}
          columnNames={["Nombre","Descripción","Precio","Tipo","Género","Imágen","Acciones"]}
          objects={productosCargados.get(paginaActualProductos)}
          objectTD={getTableData}
      />

       <Paginador
           setPaginaAnterior={handlePaginaNueva}
           setPaginaSiguiente={handlePaginaNueva}
           setPaginaActual={handlePaginaNueva}
           numeroTotalDePaginas={cantPaginasPorProducto}
           paginaActual={paginaActualProductos}
           show={show}
      />

      <ModalAgregarProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={manejarModalAgregar}
        prod={prodAEditar}
        esAgregar={esAgregar}
        tiposProductos={tiposProductos}
      />
    </>
  );
};
export default TablaTipoProducto;
