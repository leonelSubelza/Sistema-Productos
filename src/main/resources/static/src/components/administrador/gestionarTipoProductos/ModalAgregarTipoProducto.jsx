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

import Alert from "react-bootstrap/Alert";

const ModalAgregarTipoProducto = ({
  mostrarVentana,
  cerrarVentana,
  tipoProd,
  esAgregar }
) => {
  const { agregarProductoGenerico } = useContext(funcionesContext);
  const [errors, setErrors] = useState({});
  const [nombre, setNombre] = useState("");

  const vaciarCampos = () => {
    if (esAgregar) {
      setNombre("");
      setErrors({})
    }
  };

  const cerrarModal = () => {
    vaciarCampos();
    return cerrarVentana();
  };

  const valoresValidos = () => {
    let errores = {};
    //Debe escribir un texto entre 1 y 100 caracteres
    if(!(/^[a-zA-Z\s]{1,100}$/.test(nombre)) && nombre.length>50){
      errores.nombre = 'El valor de nombre es incorrecto'
    }
    setErrors(errores)
    return Object.values(errores).length === 0;
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
    agregarProductoGenerico("tiposProductos", tipoProducto,null, method).then(() =>
      cerrarModal(true)
    ).catch(e =>{cerrarModal(true);alert('error al agregar')});
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
              onChange={(ev) => {
                const { value } = ev.target;
                if(value.length>50){
                  return;
                }
                setNombre(ev.target.value);
              }}
              type="text"
            />
            {errors.nombre && <Alert key="danger" variant="danger" className="p-1">{errors.nombre}</Alert>}
          </FormGroup>

        </ModalBody>

        <ModalFooter>
          <Button onClick={cerrarModal}>Cancelar</Button>
          <Button
            color="primary"
            onClick={(e) => agregarProducto(e, esAgregar ? "POST" : "PUT")}
          >
            {`${esAgregar ? "Insertar" : "Editar"}`}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ModalAgregarTipoProducto;
