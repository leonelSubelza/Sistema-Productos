import { useContext, useEffect, useState } from "react";

import { funcionesContext } from '../../../context/FuncionesTablaContext';
// import { cargarObjetos } from "../../../service/GestionProductos";

import { Table, Button, Container } from "reactstrap";

import ModalAgregarProducto from "../ModalAgregarProducto";

const TablaTipoProducto = () => {

  const { actualizarTablaGenerica, borrarProductoGenerico } = useContext(funcionesContext);


  const [productos, setProductos] = useState([]);
  const [showModalAgregar, setShowModalAgregar] = useState(false);

  //Agregar-Editar
  const [prodAEditar, setProdAEditar] = useState();
  const [esAgregar, setEsAgregar] = useState(false);//si es agregar se borran los valores seteados


  const manejarModalAgregar = (debeAct) => {
    if (debeAct) {
      actualizarTabla();
    }
    setShowModalAgregar(false);
  };

  const actualizarTabla = async () => {
    setShowModalAgregar(false);
    setProductos(actualizarTablaGenerica('productos'));

  };

  const agregarProd = () => {
    setEsAgregar(true);
    setProdAEditar(null);
    setShowModalAgregar(true);
  };

  const borrarProducto = (prod) => {
    borrarProductoGenerico('tiposProductos', prod.id);
    actualizarTabla();
  };

  const editarProducto = (prod, tipoProd) => {
    setEsAgregar(false);
    prod.tipoProd = tipoProd;//Se agrega a la fuerza el obj tipoProd para mostrar
    setProdAEditar(prod);
    setShowModalAgregar(true);
  };

  useEffect(() => {
    actualizarTablaGenerica('tiposProductos').then(res => setProductos(res));

  }, [actualizarTablaGenerica]);



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
                productos && productos.map((tipoProd, i) => (
                  tipoProd.productos.map((prod, index) => (
                    <tr key={index}>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td>{prod.precio}</td>
                      <td>{tipoProd.nombre}</td>

                      <td>
                        <Button
                          color="primary"
                          onClick={() => editarProducto(prod, tipoProd)}
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
    </>
  );
};
export default TablaTipoProducto;
