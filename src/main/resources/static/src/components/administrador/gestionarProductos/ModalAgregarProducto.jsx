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

// import {agregarProductoGenerico} from '../../../context/FuncionesTabla.js'

export default function ModalAgregarProducto({
  mostrarVentana,
  cerrarVentana,
  prod,
  esAgregar,
  tiposProductos,
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("Sin seleccionar");
  const [precio, setPrecio] = useState("");
  const [genero, setGenero] = useState("");
  const [imagen, setImagen] = useState("");

  const [errors, setErrors] = useState({});
  const { agregarProductoGenerico } = useContext(funcionesContext);

  const vaciarCampos = () => {
    if (esAgregar) {
      setNombre("");
      setDescripcion("");
      setTipo("");
      setPrecio("");
      setGenero("");
      setImagen("");
      setErrors({})
    }
  };

  //Devolverá un booleano que indicará si debe actualizar la tabla o no
  const cerrarModal = () => {
    vaciarCampos();
    return cerrarVentana();
  };

  const sonValoresValidos = () => {
    let errores = {};
    if(!/^[a-zA-Z\s]{1,140}$/.test(nombre) && nombre.length<=50){
      errores.nombre = 'El nombre es incorrecto'
    }
    if(!/^[0-9]{1,220}$/.test(parseInt(precio)) && precio.length<=100){
      errores.precio = 'El valor de precio es incorrecto';
    }
    if(tipo === 'Sin seleccionar'){
      errores.tipo = 'Debe seleccionar un tipo de producto';
    }
    if(genero === 'Sin seleccionar'){
      errores.genero = 'Debe seleccionar un género'
    }
    setErrors(errores);
    //si la cantidad de atributos de errores es 0 entonces no hay errores => true
    return Object.values(errores).length === 0;
  };

  const agregarProducto = (e, method) => {
    e.preventDefault();

    if (!sonValoresValidos()) {
      alert("Valores erroneos");
      return;
    }
    //Se busca entre todos los tiposProductos, un tipo producto que tenga el mismo nombre
    // let idTipoProd = tiposProductos.find((p) => p.nombre === tipo).id;

    //Si el metodo es agregar se obtiene la img del form si o si
    let imagenFormulario = imagen !== "" ? imagen.files[0] : null;
    let imagenNombre;
    if(method === 'POST'){
      imagenNombre = imagen.files[0].name;
    }else{
      imagenNombre = imagen === "" ? prod.imagen : imagen.files[0].name;
    }

    let productoTipoId = (prod === null) ? tipo : prod.tipoProducto.id;
    const producto = {
      id: prod !== null ? prod.id : 0,
      nombre: nombre.toUpperCase(),
      descripcion: descripcion,
      imagen: imagenNombre,
      precio: precio,
      genero: genero,
      productTypeId: productoTipoId
    };
    agregarProductoGenerico("productos", producto, imagenFormulario, method)
      .then(() => {
        console.log("se recibio una respuesta")
        cerrarModal()
      })
      .catch((e) => {
        console.log(e)
        cerrarModal();
      });
  };

  useEffect(() => {
    //si se recibe un obj, es porque se abrio desde editar
    if (prod == null) {
      setNombre("");
      setDescripcion("");
      setTipo("Sin seleccionar");
      setPrecio("");
      setGenero("Sin seleccionar");
    } else {
      setNombre(prod.nombre);
      setDescripcion(prod.descripcion);
      setTipo(prod.tipoProducto.id);
      setPrecio(prod.precio);
      setGenero(prod.genero);
      setImagen(prod.imagen)
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
              onChange={(ev) => {
                const { value } = ev.target;
                if(value.length>50){
                  return;
                }
                setNombre(value)
              }}
              type="text"
            />
            {errors.nombre && <Alert key="danger" variant="danger" className="p-1">{errors.nombre}</Alert>}
              
            
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="descripcion"
              placeholder="Escriba una descripcion para el prod"
              autoComplete="off"
              value={descripcion}
              onChange={(ev) => {
                const { value } = ev.target;
                if(value.length>100){
                  return;
                }
                setDescripcion(ev.target.value)
              }}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <label>Imagen</label>
            <input
              className="form-control"
              name="imagen"
              onChange={(ev) => setImagen(ev.target)}
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
              onChange={(ev) => {
                const { value } = ev.target;
                if(value.length>100){
                  return;
                }
                setPrecio(ev.target.value)
              }}
            />
          {errors.precio && <Alert key="danger" variant="danger" className="p-1">{errors.precio}</Alert>}
          </FormGroup>

          <FormGroup>
            <label>Tipo:</label>

            <select
              className="form-control"
              name="tipo"
              value={tipo}
              onChange={(ev) => {
                const {value} = ev.target;
                setTipo(value);
              }}
            >
              <option>Sin seleccionar</option>
              {tiposProductos.map((prod, i) => (
                <option key={i} value={prod.id} selected={tipo===prod.id}>
                  {prod.nombre}
                </option>
              ))}
            </select>
            {errors.tipo && <Alert key="danger" variant="danger" className="p-1">{errors.tipo}</Alert>}
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
              <option value={"MASCULINO"}>MASCULINO</option>
              <option value={"FEMENINO"}>FEMENINO</option>
            </select>
            {errors.genero && <Alert key="danger" variant="danger" className="p-1">{errors.genero}</Alert>}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => cerrarModal()}>Cancelar</Button>
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
}
