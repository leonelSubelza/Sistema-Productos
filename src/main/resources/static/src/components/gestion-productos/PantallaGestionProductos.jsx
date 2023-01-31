import { useEffect } from "react";
import "../../styles/PantallaGestionProductos.css";
import GestionProductosMenu from "./GestionProductosMenu.jsx";

export default function PantallaGestionProductos() {

  const cargarTabla = async () => {
    
    const request = await fetch("http://localhost:8080/productos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });

    const productos = await request.json();
    console.log(productos);
  };


  useEffect(() => {
    cargarTabla();
  });

  return (
    <>
      <GestionProductosMenu />
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
            <tr>
              <td>01</td>
              <td>Remera</td>
              <td>Ropa</td>
              <td>$1000</td>
              <td className="elemento contenedor-botones">
                <button className="btn btn-modificar">Modificar</button>
                <button className="btn btn-modificar">Borrar</button>
              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Remera</td>
              <td>Ropa</td>
              <td>$1000</td>
              <td className="elemento contenedor-botones">
                <button className="btn btn-modificar">Modificar</button>
                <button className="btn btn-modificar">Borrar</button>
              </td>
            </tr>
            <tr>
              <td>01</td>
              <td>Remera</td>
              <td>Ropa</td>
              <td>$1000</td>
              <td className="elemento contenedor-botones">
                <button className="btn btn-modificar">Modificar</button>
                <button className="btn btn-modificar">Borrar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
