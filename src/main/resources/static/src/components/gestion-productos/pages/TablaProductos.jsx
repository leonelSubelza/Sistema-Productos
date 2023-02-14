import { useEffect, useState } from "react";
import {
  cargarObjetos,
  borrarObjeto,
} from "../../../service/GestionProductos";

import "bootstrap/dist/css/bootstrap.min.css";

import { Table, Button, Container } from "reactstrap";

import ModalAgregarProducto from "../ModalAgregarProducto";
import SpinnerLoading from "../SpinnerLoading";
import MensajeToast from "../MensajeToast";

const TablaTipoProducto = () => {
  const [productos, setProductos] = useState([]);
  const [showModalAgregar, setShowModalAgregar] = useState(false);

  const [tiposProductos, setTiposProductos] = useState([]);

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false);//si es agregar se borran los valores seteados

  //Spinner
  const [showSpinner, setShowSpinner] = useState(false);
  const [mensajeSpinner, setMensajeSpinner] = useState("");//el msj del spinner puede variar

  //Toast
  const [toast, setToast] = useState({
    show: false,
    msjBody: "",
    color: "#dc1717",
  });

  const manejarModalAgregar = (debeAct) => {
    if (debeAct) {
      actualizarTabla();
    }
    setShowModalAgregar(false);
  };

  const actualizarTabla = () => {
    setMensajeSpinner("Actualizando Tabla");
    setShowSpinner(true);
    cargarObjetos("tiposProductos")
      .then((response) => {
        //setProductos(response.map( p => p.productos));
        //setTiposProductos(response)
        console.log(response)
        setProductos(response);
        /*
        response.map( tipoPrd => (
          tipoPrd.productos.map( prod => console.log(prod))
        ))

        */

        /*console.log(response[0].productos)*/
        setShowModalAgregar(false);
        setShowSpinner(false);
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Error contectando a la BD",
          color: "#dc1717",
        });
        setProductos([]);
      });
  };

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(null);
    setShowModalAgregar(true);
  };

  const borrarProducto = (prod) => {
    setMensajeSpinner("Borrando de DB");
    setShowSpinner(true);
    borrarObjeto("productos",prod.id)
      .then(async () => {
          setShowSpinner(false);
          actualizarTabla();
          return;
      })
      .catch(() => {
        setShowSpinner(false);
        setToast({
          show: true,
          msjBody: "Se ha producido un error al borrar",
          color: "#dc1717",
        });
      } )
  };

  const editarProducto = (prod,tipoProd) => {
    console.log('prod a editar: '+prod.nombre);
    setEsAgregar(false);
    prod.tipoProd = tipoProd;//Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  useEffect(() => {
    actualizarTabla();
  }, []);

  const styles = {
    widht: "50%",
    margin: "5% auto",
  };

  return (
    <>
      <Container style={styles}>
        <br />
        <Button color="success" onClick={() => agregarProd()}>
          Agregar Producto
        </Button>
        <br />
        <br />
        <div style={{ overflow: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
                productos.map( (tipoProd,i) => (
                  tipoProd.productos.map( (prod,index) => (
                  <tr key={index}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.descripcion}</td>
                  <td>{prod.precio}</td>
                  <td>{tipoProd.nombre}</td>               

                  <td>
                    <Button
                      color="primary"
                      onClick={() => editarProducto(prod,tipoProd)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => borrarProducto(prod)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))))}
            </tbody>
          </Table>
        </div>
      </Container>
      <ModalAgregarProducto
        mostrarVentana={showModalAgregar}
        cerrarVentana={(res) => manejarModalAgregar(res)}
        prod={prodAEditar}
        esAgregar={esAgregar}
        tiposProductos={productos}
      />
      <SpinnerLoading mensaje={mensajeSpinner} openSpinner={showSpinner} />
      <MensajeToast
        show={toast.show}
        msjBody={toast.msjBody}
        color={toast.color}
        dispose={(prev) => (setToast({show:false, msjBody:prev.msjBody, color:prev.color}))}
      />
    </>
  );
};
export default TablaTipoProducto;
