import { useState, useEffect, useContext } from "react";
import { funcionesContext } from "../../../context/FuncionesTablaContext";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalAgregarTipoProducto = ({
  mostrarVentana,
  cerrarVentana,
  tipoProd,
  esAgregar }
) => {
  const { agregarProductoGenerico } = useContext(funcionesContext);

  const [nombre, setNombre] = useState("");

  const vaciarCampos = () => {
    if (esAgregar) {
      setNombre("");
    }
  };

  const cerrarModal = (debeAct) => {
    vaciarCampos();
    return cerrarVentana(debeAct);
  };

  const valoresValidos = () => {
    return nombre !== "";
  };

  const agregarProducto = (e, method) => {
    e.preventDefault();
    if (!valoresValidos()) {
      alert("Valores erroneos");
      return;
    }
    const tipoProducto = {
      id: tipoProd !== null ? tipoProd.id : 0,
      nombre: nombre.toUpperCase(),
    };
    console.log("tipo producto: " + tipoProducto);
    console.log("metodo: " + method);
    agregarProductoGenerico("tiposProductos", tipoProducto, method).then(() =>
      cerrarModal(true)
    );
  };

  useEffect(() => {
    //si se recibe un obj, es porque se abrio desde editar
    if (tipoProd == null) {
      setNombre("");
    } else {
      setNombre(tipoProd.nombre);
    }
  }, [tipoProd]);
  return (
    <>
      <Modal isOpen={mostrarVentana}>
        <ModalHeader>
          <div>
            <h3>{`${esAgregar ? "Agregar Tipo de Producto" : "Editar Tipo de Producto"}`}</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              placeholder="Escriba el nombre del producto"
              autoComplete="off"
              value={nombre}
              onChange={(ev) => setNombre(ev.target.value)}
              type="text"
            />
          </FormGroup>

        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => agregarProducto(e, esAgregar ? "POST" : "PUT")}
          >
            {`${esAgregar ? "Insertar" : "Editar"}`}
          </Button>
          <Button onClick={() => cerrarModal(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ModalAgregarTipoProducto;
