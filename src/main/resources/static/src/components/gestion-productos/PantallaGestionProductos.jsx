import { useEffect, useState } from "react";
//import "../../styles/PantallaGestionProductos.css";
//import VentanaEmergenteGestionProductos from "./VentanaEmergenteGestionProductos.jsx";
import {
  cargarProductos,
  borrarProductos,
} from "../../service/GestionProductos";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container } from "reactstrap";
import ModalAgregarProducto from "./ModalAgregarProducto";

export default function PantallaGestionProductos() {
  const [productos, setProductos] = useState([]);
  const [showVentanaAgregar, setShowVentanaAgregar] = useState(false);

  const manejarModalAgregar = (debeAct)=>{
    if(debeAct){
      actualizarTabla();
    }
    setShowVentanaAgregar(false);
  }

  const actualizarTabla = () => {
    cargarProductos().then((response) => {
      setProductos(response);
      console.log("cargando");
      setShowVentanaAgregar(false);
    });
  };

  const borrarProducto = (id) => {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id === id) {
        borrarProductos(id).then(async () => {
          console.log("cargando");
          cargarProductosTabla();
        });
        return;
      }
    }
  };

  function cargarProductosTabla() {
    cargarProductos().then((response) => setProductos(response));
  }

  useEffect(() => {
    //ARREGLAR QUE SE CONSUME LA API INFINITAMENTE
    cargarProductosTabla();
  }, []);

  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={() => setShowVentanaAgregar(true)}>
          Agregar Producto
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((prod, index) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.tipo}</td>
                <td>{prod.precio}</td>
                <td>
                  <Button color="primary">Editar</Button>{" "}
                  <Button color="danger">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <ModalAgregarProducto mostrarVentana={showVentanaAgregar} cerrarVentana={(res)=>manejarModalAgregar(res)}/>
    </>
  );
}
