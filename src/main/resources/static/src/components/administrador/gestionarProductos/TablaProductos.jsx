import { useContext, useEffect, useState } from "react";

import { funcionesContext } from "../../../context/FuncionesTablaContext";

import { Table, Button, Container } from "reactstrap";

import ModalAgregarProducto from "./ModalAgregarProducto";

import "../../../styles/ventana-productos/Tabla.css";

//Iconos
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import PaginadorProductos from "./PaginadorProductos";
import {administradorCantObjPorTabla} from "../../../service/Configuracion";

const TablaTipoProducto = ({show}) => {
  const { borrarProductoGenerico,productos,tiposProductos,cantPaginasPorProducto,actualizarProductos, } =
    useContext(funcionesContext);

  const [showModalAgregar, setShowModalAgregar] = useState(false);

  // Variables de paginacion
  // const [listaProductos, setListaProductos] = useState([]);
  // const [totalProductos, settotalProductos] = useState(listaProductos.length);
  // let totalProductos = listaProductos.length;
  // const [productosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  // const ultimoIndex = paginaActual * productosPorPagina;
  // const primerIndex = ultimoIndex - productosPorPagina;


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
  const editarProducto = (prod, tipoProd) => {
    setEsAgregar(false);
    prod.tipoProd = tipoProd; //Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  //Paginacion
  const handlePaginaNueva = (nPagina) => {
    if(nPagina>=1){
      actualizarProductos("productos",nPagina-1,administradorCantObjPorTabla, tiposProductos)
    }else{
      actualizarProductos("productos",0,administradorCantObjPorTabla, tiposProductos)
    }
    setPaginaActual(nPagina);
  }

  useEffect(() => {
    // settotalProductos(productos.length)
    setPaginaActual(1)
  },[]);

  return (
    <>
      <Container className={`contenedor-tabla ${show && 'show'}`}>
        <div className="contenedor-titulo-tabla">
          <GiClothes style={{ height: "100%", width: "4rem" }} />
          <div className="titulo-tabla">
            <h1>Gestion de Productos</h1>
            <p>Listado de los productos cargados en el sistema</p>
          </div>
        </div>

        <br />
        <Button
          color="success"
          onClick={() => agregarProd()}
          style={{ display: "flex" }}
        >
          Agregar Producto{" "}
          <IoAddCircleOutline
            style={{ width: "25px", height: "25px", margin: "0 0 0 5px" }}
          />
        </Button>
        <br />
        <br />
        <div style={{ overflow: "auto", height: "340px" }}>
          <Table>
            <thead style={{ background: "#e5e5e5" }}>
              <tr>
                <th>
                  <AiOutlineNumber />
                </th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Tipo</th>
                <th>Género</th>
                <th>Imágen</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos &&
                productos
                  .map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td style={{ color: "green" }}>$ {prod.precio}</td>
                      <td>{prod.tipoProducto.nombre}</td>
                      <td>{prod.genero}</td>
                      <td>{prod.imagen}</td>

                      <td>
                        <Button
                          color="primary"
                          onClick={() =>
                            editarProducto(prod, prod.tipoProducto.id)
                          }
                        >
                          Editar <AiFillEdit />
                        </Button>{" "}
                        <Button
                          color="danger"
                          onClick={() => borrarProducto(prod)}
                        >
                          Eliminar <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                  }
            </tbody>
          </Table>
        </div>
      </Container>

       <PaginadorProductos
           setPaginaAnterior={handlePaginaNueva}
           setPaginaSiguiente={handlePaginaNueva}
           setPaginaActual={handlePaginaNueva}
           numeroTotalDePaginas={cantPaginasPorProducto}
           paginaActual={paginaActual}
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
