import { useEffect, useState } from "react";
import "../../styles/PantallaGestionProductos.css";
import { URL } from "../../service/Configuracion";
import VentanaEmergenteGestionProductos from "./VentanaEmergenteGestionProductos.jsx";

export default function PantallaGestionProductos() {
  const [productos, setProductos] = useState([]);

  const [showVentanaAgregar,setShowVentanaAgregar] = useState(false)

  const cargarProductos = async () => {
    const request = await fetch(URL + "/productos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });

    let prod = await request.json();
    console.log(prod);

    setProductos(prod);
  };

  useEffect(() => {
    //ARREGLAR QUE SE CONSUME LA API INFINITAMENTE
    cargarProductos();
  }, []);

  return (
    <>
      <div className="contenedor-pantalla-productos">
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody className="contenedor-tabla-items">
            {productos.map((prod, index) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.tipo}</td>
                <td>{prod.precio}</td>
                <td className="elemento contenedor-botones">
                  <button
                    className="btn btn-modificar"
                    onClick={() => setShowVentanaAgregar(true)}
                  >
                    ➕
                  </button>
                  <button className="btn btn-modificar">✏️</button>
                  <button className="btn btn-danger">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <VentanaEmergenteGestionProductos mostrarVentana={showVentanaAgregar} cerrarVentana={() => setShowVentanaAgregar(false)}/>
    </>
  );
}
{
  /* lapiz: &#128393;*/
}
