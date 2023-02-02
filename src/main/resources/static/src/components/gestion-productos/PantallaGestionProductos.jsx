import { useEffect, useState } from "react";
import {
  cargarProductos,
  borrarProductos,
} from "../../service/GestionProductos";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container } from "reactstrap";
import ModalAgregarProducto from "./ModalAgregarProducto";
import SpinnerLoading from "./SpinnerLoading";

export default function PantallaGestionProductos() {
  const [productos, setProductos] = useState([]);
  const [showModalAgregar, setShowModalAgregar] = useState(false);

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

  useEffect(() => {
    actualizarTabla();
  }, []);

  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={() => setShowModalAgregar(true)}>
          Agregar Producto
        </Button>
        <br />
        <br />
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
            {productos.map((prod, index) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.tipo}</td>
                <td>{prod.precio}</td>
                <td>
                  <Button color="primary">Editar</Button>{" "}
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
      </Container>
      <ModalAgregarProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={(res) => manejarModalAgregar(res)}
      />
      <SpinnerLoading mensaje={mensajeSpinner} openSpinner={showSpinner} />
    </>
  );
}
