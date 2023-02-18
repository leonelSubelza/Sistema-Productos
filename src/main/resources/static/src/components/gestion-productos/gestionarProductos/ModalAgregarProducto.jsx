import { useState, useEffect,useContext } from "react";
import { funcionesContext } from '../../../context/FuncionesTablaContext';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function ModalAgregarProducto({
  mostrarVentana,
  cerrarVentana,
  prod,
  esAgregar,
  tiposProductos
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState('')
  const [tipo, setTipo] = useState("Sin seleccionar");
  const [precio, setPrecio] = useState("");
  const [genero, setGenero] = useState('')

  const {agregarProductoGenerico} = useContext(funcionesContext);

  const vaciarCampos = () => {
    if (esAgregar) {
      setNombre("");
      setDescripcion('')
      setTipo("");
      setPrecio("");
      setGenero('')
    }

  };

  //Devolverá un booleano que indicará si debe actualizar la tabla o no
  const cerrarModal = (debeAct) => {
    vaciarCampos();
    return cerrarVentana(debeAct);
  };

  const valoresValidos = () => {
    return nombre !== "" && precio !== "0" && tipo !== "Sin seleccionar" && genero !== 'Sin seleccionar';
  };

  const agregarProducto = (e, method) => {
    e.preventDefault();
    if (!valoresValidos()) {
      alert("Valores erroneos");
      return;
    }
    let idTipoProd = tiposProductos.find(p => p.nombre === tipo).id;
    const producto = {
      "id": prod !== null ? prod.id : 0,
      "nombre": nombre,
      "descripcion": descripcion,
      "imagen": null,
      "precio": precio,
      "genero": genero,
      "tipoProducto": {
        "id": idTipoProd
      }
  }
  console.log(producto);
  agregarProductoGenerico('productos',producto,method).then(() => cerrarModal(true))
  };

  useEffect(() => {
    //si se recibe un obj, es porque se abrio desde editar
    if (prod == null) {
      setNombre('');
      setDescripcion('')
      setTipo('Sin seleccionar');
      setPrecio('');      
      setGenero('Sin seleccionar');      
    }else{

      setNombre(prod.nombre);
      setDescripcion(prod.descripcion)
      setTipo(prod.tipoProd.nombre);
      setPrecio(prod.precio);
      setGenero(prod.genero)
    }
  }, [prod]);

  return (
    <>
      <Modal isOpen={mostrarVentana}>
        <ModalHeader>
          <div>
            <h3>{`${esAgregar ? "Agregar Producto" : "Editar Producto"}`}</h3>
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

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="descripcion"
              placeholder="Escriba una descripcion para el prod"
              autoComplete="off"
              value={descripcion}
              onChange={(ev) => setDescripcion(ev.target.value)}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="precio"
              type="number"
              placeholder="Escriba el precio del producto"
              autoComplete="off"
              value={precio}
              onChange={(ev) => setPrecio(ev.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Tipo:</label>

            <select
              className="form-control"
              name="tipo"
              value={tipo}
              onChange={(ev) => setTipo(ev.target.value)}
            >
              <option>Sin seleccionar</option>
              {tiposProductos.map((tipoProd, i) => (
                <option key={i} value={tipoProd.nombre}>
                  {tipoProd.nombre}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Genero:</label>

            <select
              className="form-control"
              name="genero"
              value={genero}
              onChange={(ev) => setGenero(ev.target.value)}
            >
              <option>Sin seleccionar</option>
              <option value={'MASCULINO'}>MASCULINO</option>
              <option value={'FEMENINO'}>FEMENINO</option>
              
            </select>
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
}