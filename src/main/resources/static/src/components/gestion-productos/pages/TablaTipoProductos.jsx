import { useEffect, useState } from "react";
import {
  cargarObjetos,
  borrarObjeto,
  crearObjeto,
} from "../../../service/GestionProductos";

import "bootstrap/dist/css/bootstrap.min.css";

import { Table, Button, Container } from "reactstrap";

import FormButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//import ModalAgregarProducto from "../ModalAgregarProducto";
import SpinnerLoading from "../SpinnerLoading";
import MensajeToast from "../MensajeToast";

const TablaTipoProducto = () => {
  const [tipoProducto, setTiposProductos] = useState([]);

  const [nuevoNombre, setNuevoNombre] = useState("");

  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState(""); //el msj del spinner puede variar

  //Toast
  const [toast, setToast] = useState({
    show: false,
    msjBody: "",
    color: "#dc1717",
  });

  const actualizarTabla = () => {
    setMensajeSpinner("Actualizando Tabla tipo prod");
    setShowSpinner(true);
    cargarObjetos("tiposProductos")
      .then((response) => {
        setTiposProductos(response);
        console.log(response)
        setShowSpinner(false);
        console.log("deberia cerrar el spinner");
      })
      .catch(() => {
        console.log("error wahcoh");
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
        setTiposProductos([]);
      });
  };

  const agregarTipoProducto = (e) => {
    e.preventDefault();
    if (nuevoNombre === "") {
      alert("Valores erroneos");
      return;
    }
    const producto = {
      id: 0,
      nombre: nuevoNombre.toUpperCase(),
    };
    setMensajeSpinner("Guardando en DB");
    setShowSpinner(true);
    crearObjeto("tiposProductos", producto, "POST")
      .then((res) => {
        console.log(res);
        setShowSpinner(false);
        actualizarTabla();
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
      });
  };

  const borrarProducto = (id) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    borrarObjeto("tiposProductos", id)
      .then(async () => {
        setShowSpinner(false);
        actualizarTabla();
        return;
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Se ha producido un error al borrar",
          color: "#dc1717",
        });
      });
  };

  useEffect(() => {
    actualizarTabla();
  }, []);

  return (
    <>
      <Container>
        <br />

        <Form
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: "2%",
          }}
        >
          <Form.Label>Tipo de Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="REMERA"
            autoFocus
            style={{ width: "40%" }}
            name={"nuevoNombre"}
            value={nuevoNombre}
            onChange={(ev) => setNuevoNombre(ev.target.value)}
          />
          <FormButton variant="primary" onClick={agregarTipoProducto}>
            Save Changes
          </FormButton>
        </Form>

        <br />
        <br />
        <div style={{ overflow: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>

            <tbody>
              {tipoProducto.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.nombre}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => alert("edita el prod xd")}
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
      <SpinnerLoading mensaje={mensajeSpinner} openSpinner={showSpinner} />
      <MensajeToast
        show={toast.show}
        msjBody={toast.msjBody}
        color={toast.color}
        dispose={(prev) =>
          setToast({ show: false, msjBody: prev.msjBody, color: prev.color })
        }
      />
    </>
  );
};
export default TablaTipoProducto;
