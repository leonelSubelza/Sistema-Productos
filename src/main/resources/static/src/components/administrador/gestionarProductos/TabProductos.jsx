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

const TabProductos = ({show}) => {
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

  useEffect(() => {
    if(!sesionIniciada){
      navigate('/login');
      return;
    }
    // settotalProductos(productos.length)
    if(paginaActualProductos>1){
      setPaginaActualProductos(1)
      actualizarProductos("productos",0,administradorCantObjPorTabla, tiposProductos);
    }
  },[]);

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
              objects={productosCargados.get(paginaActualProductos)}
              addObject={agregarProd}
              editObject={editarProducto}
              removeObject={borrarProducto}
            />

            <Paginador
              setPaginaAnterior={handlePaginaNueva}
              setPaginaSiguiente={handlePaginaNueva}
              setPaginaActual={handlePaginaNueva}
              numeroTotalDePaginas={cantPaginasPorProducto}
              paginaActual={paginaActualProductos}
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
      </>
  );
};
export default TabProductos;
