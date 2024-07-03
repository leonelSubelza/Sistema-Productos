import React, { useState, useEffect, useContext } from "react";
import { funcionesContext } from "../../../context/FuncionesTablaContext.jsx";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import Alert from "react-bootstrap/Alert";
import {URLImagenes} from "../../../service/Configuracion.js";

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
  const [tipoProductoId, setTipoProductoId] = useState("Sin seleccionar");
  const [precio, setPrecio] = useState("");
  const [genero, setGenero] = useState("");
  //guarda el nombre de la imagen o el archivo img
  const [imagenNombre, setImagenNombre] = useState("");
  const [imagenArchivo, setImagenArchivo] = useState();
  const [urlImg, setUrlImg] = useState('');

  const [errors, setErrors] = useState({});
  const { agregarProductoGenerico } = useContext(funcionesContext);

  const vaciarCampos = () => {
      setNombre("");
      setDescripcion("");
      setTipoProductoId("");
      setPrecio("");
      setGenero("");
      setImagenNombre("");
      setImagenArchivo(undefined)
      setUrlImg('')
      setErrors({})
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
    if(!/^[0-9]{1,220}$/.test(parseInt(precio)) && precio.toString().length>100){
      errores.precio = 'El valor de precio es incorrecto';
    }
    if(tipoProductoId === 'Sin seleccionar'){
      errores.tipo = 'Debe seleccionar un tipo de producto';
    }
    if(genero === 'Sin seleccionar'){
      errores.genero = 'Debe seleccionar un género'
    }
    if(imagenNombre==='' && imagenArchivo === undefined){
      errores.imagen = 'Debe seleccionar una imágen';
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

    // let productoTipoId = (prod === undefined) ? tipoProductoId : prod.tipoProducto.id;
    const producto = {
      id: prod === undefined ? 0 : prod.id,
      nombre: nombre.toUpperCase(),
      descripcion: descripcion,
      imagen: imagenNombre,
      precio: precio,
      genero: genero,
      productTypeId: tipoProductoId
    };
    agregarProductoGenerico("productos", producto, imagenArchivo, method)
      .then(() => {
        console.log("se recibio una respuesta")
        cerrarModal()
      })
      .catch((e) => {
        console.log(e)
        cerrarModal();
      });
  };

  const handleImagenAgregada = (event) => {
    //Cargamos el archivo img
    setImagenArchivo(event.target.files[0])
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        setUrlImg(lector.result);
        setImagenNombre(archivo.name);
    };
    lector.readAsDataURL(archivo);
  }
}

  useEffect(() => {
    if(prod !== undefined){
      //si el prod tiene una img le generamos el path para la primer img
      setUrlImg(`${URLImagenes}${prod.imagen}?timestamp=${new Date().getTime()}`)
    }

    if (prod === undefined) {
      setNombre("");
      setDescripcion("");
      setTipoProductoId("Sin seleccionar");
      setPrecio("");
      setGenero("Sin seleccionar");
      setImagenNombre('');
      setImagenArchivo(undefined);
      setUrlImg('')
    } else {
      setNombre(prod.nombre);
      setDescripcion(prod.descripcion);
      setTipoProductoId(prod.tipoProducto.id);
      setPrecio(prod.precio);
      setGenero(prod.genero);
      setImagenNombre(prod.imagen);
      setImagenArchivo(undefined)
    }

  }, [mostrarVentana]);

  return (
    <>
      <Modal isOpen={mostrarVentana} size={'lg'} >
        <ModalHeader>
          <div>
            <h3>{`${esAgregar ? "Agregar Producto" : "Editar Producto"}`}</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <div
            className={"modal-input-containers"}
            style={{display:"flex",flexDirection:"column", width:"100%",height:"100%", margin:"auto"}}
          >

            <div
              className={"modal-input-containers-elements"}
              style={{display:"flex", width:"100%", justifyContent:"space-between"}}>

              <FormGroup className={"modal-group-container"}
                         style={{display:"flex",flexDirection:"column", width:"auto"}}>
                {/*<label>Imagen</label>*/}
                <img
                  src={(prod===undefined&&urlImg==='') ?
                    ''
                    : urlImg}
                  alt="foto-del-producto"
                  style={{width:"237px", height:"237px"}}
                />
                <input
                  className="form-control"
                  name="imagen"
                  onChange={handleImagenAgregada}
                  type="file"
                  color="dark"
                />
                {errors.imagen && <Alert key="danger" variant="danger" className="p-1">{errors.imagen}</Alert>}
              </FormGroup>

              <div className={"modal-input-element"}
                   style={{display:"flex",flexDirection:"column", width:"100%"}}>
                <FormGroup className={"modal-group-container"}>
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
                <FormGroup className={"modal-input-element"} style={{height:"100%"}}>
                  <label>Descripcion:</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    placeholder="Escriba una descripcion para el prod"
                    // autoComplete="off"
                    value={descripcion}
                    style={{height:"80%"}}
                    onChange={(ev) => {
                      const { value } = ev.target;
                      if(value.length>100){
                        return;
                      }
                      setDescripcion(ev.target.value)
                    }}
                    // type="text"
                    >
                  </textarea>
                </FormGroup>
              </div>
            </div>

            <div
              className={"modal-input-containers-elements"}
              style={{display:"flex", width:"100%", margin:"auto"}}>
              <FormGroup className={"modal-input-element"} style={{width:"33%"}}>
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
                    if(value.toString().length>100){
                      return;
                    }
                    setPrecio(ev.target.value)
                  }}
                />
                {errors.precio && <Alert key="danger" variant="danger" className="p-1">{errors.precio}</Alert>}
              </FormGroup>
              <FormGroup className={"modal-input-element"} style={{width:"33%"}}>
                <label>Tipo:</label>

                <select
                  className="form-control"
                  name="tipo"
                  value={tipoProductoId}
                  onChange={(ev) => {
                    const {value} = ev.target;
                    setTipoProductoId(value);
                  }}
                >
                  <option>Sin seleccionar</option>
                  {tiposProductos.map((prod, i) => (
                    <option key={i} value={prod.id} defaultChecked={tipoProductoId===prod.id}>
                      {prod.nombre}
                    </option>
                  ))}
                </select>
                {errors.tipo && <Alert key="danger" variant="danger" className="p-1">{errors.tipo}</Alert>}
              </FormGroup>
              <FormGroup className={"modal-input-element"} style={{width:"33%"}}>
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

            </div>
          </div>

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
