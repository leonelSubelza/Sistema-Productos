import { useState } from "react";
import { estadosProductos } from "../../service/EstadosProductos";
import { crearProductos } from "../../service/GestionProductos";
//import "../../styles/VentanaEmergenteGestionProductos.css";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import SpinnerLoading from "./SpinnerLoading";


export default function ModalAgregarProducto({mostrarVentana, cerrarVentana}) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");

  //Spinner
  const [showSpinner,setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState('')

  const vaciarCampos = ()=>{
    setNombre('');
    setTipo('')
    setPrecio('');
  }

  //Devolverá un booleano que indicará si debe actualizar la tabla o no
  const cerrarModal = (debeAct)=>{
    vaciarCampos();
    return cerrarVentana(debeAct);
  }

  const agregarProducto = (e) => {
    e.preventDefault();
    if(nombre === '' || precio === '0' || tipo === 'Sin seleccionar'){
        alert('Valores erroneos')
        return;
    }
    const prod = {
      id: 0,
      nombre: nombre,
      tipo: tipo,
      precio: precio,
    };
    console.log(prod);
    setMensajeSpinner('Guardando en DB');
    setShowSpinner(true);
    crearProductos(prod,'POST').then(() => {
      setShowSpinner(false);
      cerrarModal(true);
    });
  };

  return (
    <>
    <Modal isOpen={mostrarVentana}>
    <ModalHeader>
     <div><h3>Insertar Producto</h3></div>
    </ModalHeader>

    <ModalBody>
      <FormGroup>
        <label>
          Nombre: 
        </label>
        
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
        <label>
          Tipo: 
        </label>

        <select
        className="form-control"
      name="tipo"
      value={tipo}
      onChange={(ev) => setTipo(ev.target.value)}
    >
      <option>Sin seleccionar</option>
      {estadosProductos.map((estado, i) => (
        <option key={i} value={estado}>
          {estado}
        </option>
      ))}
    </select>

      </FormGroup>
      
      <FormGroup>
        <label>
          Precio: 
        </label>
        <input
          className="form-control"
          name="precio"
          type="text"
          placeholder="Escriba el precio del producto"
          autoComplete="off"
          value={precio}
          onChange={(ev) => setPrecio(ev.target.value)}
        />
      </FormGroup>
    </ModalBody>

    <ModalFooter>
      <Button
        color="primary"
        onClick={(e) => agregarProducto(e)}
      >
        Insertar
      </Button>
      <Button
        onClick={() => cerrarModal(false)}
      >
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
  <SpinnerLoading mensaje={mensajeSpinner} openSpinner={showSpinner}/>
  </>
  );
}
