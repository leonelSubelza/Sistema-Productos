import { useEffect, useState } from "react";
import {
  cargarProductos,
  borrarProductos,
} from "../../service/GestionProductos";

import "bootstrap/dist/css/bootstrap.min.css";

import { Table, Button, Container } from "reactstrap";

import ModalAgregarProducto from "./ModalAgregarProducto";
import SpinnerLoading from "./SpinnerLoading";

const TablaTipoProducto = () => {
  const [productos, setProductos] = useState([]);
  const [showModalAgregar, setShowModalAgregar] = useState(false);

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false);

  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState("");

  const manejarModalAgregar = (debeAct) => {
    if (debeAct) {
      actualizarTabla();
    }
    setShowModalAgregar(false);
  };

  const actualizarTabla = () => {
    setMensajeSpinner("Actualizando Tabla");
    setShowSpinner(true);
    cargarProductos().then((response) => {
      setProductos(response);
      setShowModalAgregar(false);
      setShowSpinner(false);
    });
  };

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(null);
    setShowModalAgregar(true);
  };

  const borrarProducto = (id) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id === id) {
        borrarProductos(id).then(async () => {
          setShowSpinner(false);
          actualizarTabla();
        });
        return;
      }
    }
  };

  const editarProducto = (prod) => {
    setEsAgregar(false);
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  useEffect(() => {
    actualizarTabla();
  }, []);

  const styles = {
    widht: "50%",
    margin: "5% auto",
  };

  return (
    <>
      <Container style={styles}>
        <br />
        <Button color="success" onClick={() => agregarProd()}>
          Agregar Producto
        </Button>
        <br />
        <br />
        <div style={{ overflow: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.tipo}</td>
                  <td>{prod.precio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => editarProducto(prod)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => borrarProducto(prod.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <ModalAgregarProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={(res) => manejarModalAgregar(res)}
        prod={prodAEditar}
        esAgregar={esAgregar}
      />
      <SpinnerLoading mensaje={mensajeSpinner} openSpinner={showSpinner} />
    </>
  );
};
export default TablaTipoProducto;
