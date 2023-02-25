import { useState, useEffect, useContext } from "react";
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
  const [imagen,setImagen] = useState('');

  const { agregarProductoGenerico } = useContext(funcionesContext);

  const vaciarCampos = () => {
    if (esAgregar) {
      setNombre("");
      setDescripcion('')
      setTipo("");
      setPrecio("");
      setGenero('')
      setImagen('')
    }
  };

  //Devolverá un booleano que indicará si debe actualizar la tabla o no
  const cerrarModal = () => {
    vaciarCampos();
    return cerrarVentana();
  };

  const valoresValidos = () => {
    return nombre !== "" && precio !== "0" && tipo !== "Sin seleccionar" && genero !== 'Sin seleccionar' && imagen!=='';
  };

  const agregarProducto = (e, method) => {
    e.preventDefault();
    //#FALTA HACER LA VALIDACION DE CAMPOS CORRECTA
    if (!valoresValidos()) {
      alert("Valores erroneos");
      return;
    }
    //Se busca entre todos los tiposProductos, un tipo producto que tenga el mismo nombre
    let idTipoProd = tiposProductos.find( p => p.nombre === tipo).id;
    const producto = {
      "id": prod !== null ? prod.id : 0,
      "nombre": nombre,
      "descripcion": descripcion,
      "imagen": imagen.files[0].name,
      "precio": precio,
      "genero": genero,
      "tipoProducto": {
        "id": idTipoProd
      }
    }

    console.log('imagen name: '+imagen.files[0].name);
    agregarProductoGenerico('productos', producto, imagen.files[0],method).then(() => cerrarModal())
    .catch(e => {console.log('error al agregar Prod: '+e);cerrarModal()})
  };

  useEffect(() => {
    //si se recibe un obj, es porque se abrio desde editar
    if (prod == null) {
      setNombre('');
      setDescripcion('')
      setTipo('Sin seleccionar');
      setPrecio('');
      setGenero('Sin seleccionar');
    } else {
      setNombre(prod.nombre);
      setDescripcion(prod.descripcion)
      setTipo(prod.tipoProducto.nombre);
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
            <label>Imagen</label>
            <input 
              className="form-control"
              name="imagen"
              onChange={(ev) =>setImagen(ev.target)}
              type="file"
              color="dark"
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
              {tiposProductos.map((prod, i) => (
                <option key={i} value={prod.nombre}>
                  {prod.nombre}
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
          <Button onClick={() => cerrarModal()}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
