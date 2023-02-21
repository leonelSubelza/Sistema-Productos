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

const TablaTipoProducto = () => {
  const { borrarProductoGenerico,productos,tiposProductos } =
    useContext(funcionesContext);

  const [showModalAgregar, setShowModalAgregar] = useState(false);

  // Variables de paginacion
  const [listaProductos, setListaProductos] = useState([]);
  const [totalProductos, settotalProductos] = useState(listaProductos.length);
  // let totalProductos = listaProductos.length;
  const [productosPorPagina] = useState(5);
  const [paginaActual, setpaginaActual] = useState(1);
  const ultimoIndex = paginaActual * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false); //si es agregar se borran los valores seteados



  const manejarModalAgregar = (debeAct) => {
    setShowModalAgregar(false);
  };

  const actualizarTabla = async () => {
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

  useEffect(() => {
    settotalProductos(productos.length)

  }, [productos]);


  return (
    <>
      <Container className="contenedor-tabla">
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
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Tipo</th>
                <th>Genero</th>
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
                  )).slice(primerIndex, ultimoIndex)
                  }
            </tbody>
          </Table>
        </div>
      </Container>

      <PaginadorProductos
        productosPorPagina={productosPorPagina}
        paginaActual={paginaActual}
        setpaginaActual={setpaginaActual}
        totalProductos={totalProductos}
      />

      <ModalAgregarProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={(res) => manejarModalAgregar(res)}
        prod={prodAEditar}
        esAgregar={esAgregar}
        tiposProductos={tiposProductos}
      />
    </>
  );
};
export default TablaTipoProducto;
