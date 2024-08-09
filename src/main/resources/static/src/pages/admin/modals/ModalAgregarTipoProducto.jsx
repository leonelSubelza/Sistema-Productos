import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import {toast} from "sonner";
import Alert from "react-bootstrap/Alert";
import {IMAGES_URL_PRODUCT_TYPE} from "../../../service/Configuracion.js";
import {crearObjeto} from "../../../service/GestionProductos.js";

const ModalAgregarTipoProducto = ({
  mostrarVentana,
  cerrarVentana,
  tipoProd,
  esAgregar }
) => {
  // const { agregarProductoGenerico } = useContext(funcionesContext);
  const [errors, setErrors] = useState({});
  const [nombre, setNombre] = useState("");
  const [imageProdType, setImageProdType] = useState('')
  const [sendBtnIsDisabled, setSendBtnIsDisabled] = useState(false)

  const [urlImg, setUrlImg] = useState('')
  const [imgArchivo, setImgArchivo] = useState()

  const vaciarCampos = () => {
    // if (esAgregar) {
      setNombre("");
      setImageProdType('')
      setErrors({})
      setUrlImg('');
      setImgArchivo(undefined)
    // }
    setSendBtnIsDisabled(false)
  };

  const cerrarModal = (updateValues) => {
    vaciarCampos();
    return cerrarVentana(updateValues);
  };

  const valoresValidos = () => {
    let errores = {};
    //Debe escribir un texto entre 1 y 100 caracteres
    if(!(/^[a-zA-Z\s]{1,100}$/.test(nombre)) && nombre.length>50){
      errores.nombre = 'El valor de nombre es incorrecto'
    }
    if(imageProdType==='' && imgArchivo === undefined){
      errores.imagen = 'Debe seleccionar una imágen';
    }
    setErrors(errores)
    return Object.values(errores).length === 0;
  };



  const handleImagenAgregada = (event) => {
    //Cargamos el archivo img
    const archivo = event.target.files[0];
    setImgArchivo(archivo)
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        setUrlImg(lector.result);
        setImageProdType(archivo.name)
      };
      lector.readAsDataURL(archivo);
    }
  }



  const agregarProducto = (e, method) => {
    e.preventDefault();
    if (!valoresValidos()) {
      alert("Valores erroneos");
      return;
    }
    const tipoProducto = {
      id: tipoProd !== null ? tipoProd.id : 0,
      nombre: nombre.toUpperCase(),
      imagen: imageProdType
    };
    setSendBtnIsDisabled(true);

    try{
      // const promise = agregarProductoGenerico("tiposProductos", tipoProducto, imgArchivo, method);
      const promise = crearObjeto("tiposProductos", tipoProducto, imgArchivo, method);
      toast.promise(promise, {
        loading: "Guardando nuevo Tipo de Producto",
        success: () => {
          setSendBtnIsDisabled(false);
          cerrarModal(true)
          return `Tipo producto ${tipoProducto.nombre} guardado con éxito`;
        },
        error: `Error al guardar el tipo producto ${tipoProducto.nombre}`,
      });
    }catch (e) {
      console.log("error en agregar prod");
    }

  };

  useEffect(() => {
    //si se recibe un obj, es porque se abrio desde editar
    if (tipoProd == null) {
      setNombre("");
      setUrlImg('');
    } else {
      setNombre(tipoProd.nombre);
      setImageProdType(tipoProd.imagen)
      if(tipoProd.imagen!==null && tipoProd.imagen!=='') {
        setUrlImg(`${IMAGES_URL_PRODUCT_TYPE}${tipoProd.imagen}?timestamp=${new Date().getTime()}`)
      }
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
          <FormGroup className={"modal-group-container"}
                     style={{display:"flex",flexDirection:"column", width:"auto"}}>
            {/*<label>Imagen</label>*/}
            <img
              src={(tipoProd===undefined&&urlImg==='') ?
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
                setNombre(ev.target.value.toUpperCase());
              }}
              type="text"
            />
            {errors.nombre && <Alert key="danger" variant="danger" className="p-1">{errors.nombre}</Alert>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>cerrarModal(false)}>Cancelar</Button>
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
};
export default ModalAgregarTipoProducto;
