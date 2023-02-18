import { useEffect, useState,useContext } from "react";

import { funcionesContext } from '../../../context/FuncionesTablaContext';

import { Table, Button, Container } from "reactstrap";

import ModalAgregarTipoProducto from "./ModalAgregarTipoProducto";

import "../../../styles/ventana-productos/Tabla.css";

//Iconos
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { MdLabelImportant } from "react-icons/md";

const TablaTipoProducto = () => {
  const [tiposProductos, setTiposProductos] = useState([]);

  const {actualizarTablaGenerica,borrarProductoGenerico} = useContext(funcionesContext);

//modal
const [showModalAgregar, setShowModalAgregar] = useState(false);

//Agregar-Editar
const [prodAEditar, setProdAEditar] = useState();
const [esAgregar, setEsAgregar] = useState(false);//si es agregar se borran los valores seteados


  const actualizarTabla = async () => {
    setShowModalAgregar(false);
    actualizarTablaGenerica('tiposProductos').then(res => setTiposProductos(res));      
  };

  const manejarModalAgregar = (debeAct) => {
    if (debeAct) {
      actualizarTabla();
    }
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
    borrarProductoGenerico('productos',prod.id).then(() => actualizarTabla());
  };

  useEffect(() => {
    actualizarTablaGenerica('tiposProductos').then(res => setTiposProductos(res));      
  }, [actualizarTablaGenerica]);

  return (
    <>
      <Container className="contenedor-tabla">
      <div className="contenedor-titulo-tabla">
      <MdLabelImportant style={{ width: "40px", height: "40px", margin: "0 0 0 5px" }}/>
      <div className="titulo-tabla">
          <h1>            
            Gestion de Tipos de Productos
          </h1>
          <p>Listado de los tipos productos a los que puede pertenecer un producto</p>
        </div>
      </div>
        <br />
        <Button color="success" onClick={() => agregarProd()} style={{display:'flex'}}>
        Agregar <IoAddCircleOutline style={{width:"25px", height:'25px', margin:'0 0 0 5px'}} />
        </Button>
        <br />
        <br />
        <div style={{ overflow: "auto" }}>
          <Table >
            <thead style={{background: "#e5e5e5"}}>
              <tr>
              <th>
                  <AiOutlineNumber />
                </th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
              tiposProductos && tiposProductos.map( (tipoProd,index) => (
                  <tr key={index}>
                  <td>{tipoProd.id}</td>
                  <td>{tipoProd.nombre}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => editarProducto(tipoProd)}
                        >
                          Editar <AiFillEdit />
                        </Button>{" "}
                        <Button
                          color="danger"
                          onClick={() => borrarProducto(tipoProd)}
                        >
                          Eliminar <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <ModalAgregarTipoProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={(res) => manejarModalAgregar(res)}
        tipoProd={prodAEditar}
        esAgregar={esAgregar}
      />
    </>
  );
};
export default TablaTipoProducto;
