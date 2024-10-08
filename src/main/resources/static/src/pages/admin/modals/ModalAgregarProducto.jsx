import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import Alert from "react-bootstrap/Alert";
import {IMAGES_URL} from "../../../service/Configuracion.js";
import {toast} from "sonner";
import {crearObjeto} from "../../../service/GestionProductos.js";

const product_initialValue = {
  id: 0,
  nombre: "",
  descripcion: "",
  imagen: "",
  precio: 0,
  genero: "Sin seleccionar",
  productTypeId: "Sin seleccionar",
}

export default function ModalAgregarProducto({
  mostrarVentana,
  cerrarVentana,
  prod,
  esAgregar,
  tiposProductos,
}) {
  const [productoAGuardar, setProductoAGuardar] = useState({ ...product_initialValue });
  const [sendBtnIsDisabled, setSendBtnIsDisabled] = useState(false)
  // contiene el archivo img
  const [imagenArchivo, setImagenArchivo] = useState();
  // contiene una url generada por si se agrega una img para vista previa
  const [urlImg, setUrlImg] = useState('');

  const [errors, setErrors] = useState({});

  const vaciarCampos = () => {
      setProductoAGuardar({ ...product_initialValue });
      setImagenArchivo(undefined);
    setSendBtnIsDisabled(false)
      setUrlImg('')
      setErrors({})
  };

  //Devolverá un booleano que indicará si debe actualizar la tabla o no
  const cerrarModal = (updateValues) => {
    vaciarCampos();
    return cerrarVentana(updateValues);
  };

  const sonValoresValidos = () => {
    let errores = {};
    if(!/^[a-zA-Z\s-]{1,140}$/.test(productoAGuardar.nombre) && productoAGuardar.nombre.length<=50){
      errores.nombre = 'El nombre es incorrecto'
    }
    if(!/^[0-9]{1,220}$/.test(parseInt(productoAGuardar.precio)) && productoAGuardar.precio.toString().length>100
    && parseInt(productoAGuardar.precio)){
      errores.precio = 'El valor de precio es incorrecto';
    }
    if(productoAGuardar.productTypeId === 'Sin seleccionar'){
      errores.tipo = 'Debe seleccionar un tipo de producto';
    }
    if(productoAGuardar.genero === 'Sin seleccionar'){
      errores.genero = 'Debe seleccionar un género'
    }
    if(productoAGuardar.imagen==='' && imagenArchivo === undefined){
      errores.imagen = 'Debe seleccionar una imágen';
    }
    setErrors(errores);
    //si la cantidad de atributos de errores es 0 entonces no hay errores => true
    return Object.values(errores).length === 0;
  };

  const handleImagenAgregada = (event) => {
    //Cargamos el archivo img
    setImagenArchivo(event.target.files[0])
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        setUrlImg(lector.result);
        productoAGuardar.imagen = archivo.name
        setProductoAGuardar(productoAGuardar);
    };
    lector.readAsDataURL(archivo);
  }
}

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "nombre" && value.length > 50) {
      return;
    }
    if (name === "descripcion" && value.length>100) {
      return;
    }
    if (name === "precio" && value.toString().length>100) {
      return;
    }
/*    if (name === "tipo" && value.toString().length>100) {
      return;

    }*/
    setProductoAGuardar(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const agregarProducto = (e, method) => {
    e.preventDefault();

    if (!sonValoresValidos()) {
      alert("Valores erroneos");
      return;
    }

    // let productoTipoId = (prod === undefined) ? tipoProductoId : prod.tipoProducto.id;
    productoAGuardar.id = prod === undefined ? 0 : prod.id

    setSendBtnIsDisabled(true);
    try {
       // agregarProductoGenerico("productos", productoAGuardar, imagenArchivo, method);
      const promise = crearObjeto("productos",productoAGuardar, imagenArchivo,method);
      toast.promise(promise, {
        loading: "Guardando nuevo producto",
        success: () => {
          setSendBtnIsDisabled(false);
          cerrarModal(true)
          return `Producto ${productoAGuardar.nombre} guardado con éxito`;
        },
        error: 'Error al guardar producto ' + productoAGuardar.nombre,
      });
    } catch (e) {
      // toast.error('Error al guardar producto ' + productoAGuardar.nombre);
      console.log("error en agregar prod");
    }
  };


  useEffect(() => {
    if (prod === undefined) {
      setProductoAGuardar({ ...product_initialValue })
      setImagenArchivo(undefined);
      setUrlImg('');
    } else {
      productoAGuardar.nombre = prod.nombre;
      productoAGuardar.descripcion = prod.descripcion;
      productoAGuardar.productTypeId = prod.tipoProducto.id;
      productoAGuardar.precio = prod.precio;
      productoAGuardar.genero = prod.genero;
      productoAGuardar.imagen = prod.imagen;
      setProductoAGuardar(productoAGuardar)

      if(prod.imagen){
        setUrlImg(`${IMAGES_URL}${prod.imagen}?timestamp=${new Date().getTime()}`)
      }
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
                    value={productoAGuardar.nombre}
                    onChange={handleInputChange}
                    type="text"
                  />
                  {errors.nombre && <Alert key="danger" variant="danger" className="p-1">{errors.nombre}</Alert>}
                </FormGroup>
                <FormGroup className={"modal-input-element"} style={{height:"100%"}}>
                  <label>Descripción:</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    placeholder="Escriba una descripcion para el prod"
                    // autoComplete="off"
                    value={productoAGuardar.descripcion}
                    style={{height:"80%"}}
                    onChange={handleInputChange}
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
                  value={productoAGuardar.precio}
                  onChange={handleInputChange}
                />
                {errors.precio && <Alert key="danger" variant="danger" className="p-1">{errors.precio}</Alert>}
              </FormGroup>
              <FormGroup className={"modal-input-element"} style={{width:"33%"}}>
                <label>Tipo:</label>
                <select
                  className="form-control"
                  name="productTypeId"
                  value={productoAGuardar.productTypeId}
                  onChange={handleInputChange}
                >
                  <option>Sin seleccionar</option>
                  {tiposProductos.map((prod, i) => (
                    <option key={i} value={prod.id} defaultChecked={productoAGuardar.productTypeId===prod.id}>
                      {prod.nombre}
                    </option>
                  ))}
                </select>
                {errors.tipo && <Alert key="danger" variant="danger" className="p-1">{errors.tipo}</Alert>}
              </FormGroup>
              <FormGroup className={"modal-input-element"} style={{width:"33%"}}>
                <label>Género:</label>
                <select
                  className="form-control"
                  name="genero"
                  value={productoAGuardar.genero}
                  onChange={handleInputChange}
                >
                  <option>Sin seleccionar</option>
                  <option value={"MASCULINO"}>MASCULINO</option>
                  <option value={"FEMENINO"}>FEMENINO</option>
                  <option value={"UNISEX"}>UNISEX</option>
                </select>
                {errors.genero && <Alert key="danger" variant="danger" className="p-1">{errors.genero}</Alert>}
              </FormGroup>

            </div>
          </div>
          </ModalBody>

        <ModalFooter>
          <Button onClick={() => cerrarModal(false)}>Cancelar</Button>
          <Button
            color="primary"
            disabled={sendBtnIsDisabled}
            onClick={(e) => agregarProducto(e, esAgregar ? "POST" : "PUT")}
          >
            {`${esAgregar ? "Insertar" : "Editar"}`}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
