import { useEffect, useState } from "react";
import "../../styles/PantallaGestionProductos.css";
import GestionProductosMenu from "./GestionProductosMenu.jsx";
import ItemTablaProducto from "./ItemTablaProducto";

export default function PantallaGestionProductos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const request = await fetch("http://localhost:8080/productos", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });

    let prod = await request.json();
    console.log(prod);
    
    setProductos(prod)
  };


  useEffect(() => {
    //ARREGLAR QUE SE CONSUME LA API INFINITAMENTE
    cargarProductos();
},[])

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
          {productos.map((prod,index) => 
          /*
            <ItemTablaProducto 
            key={prod.id}
            id={prod.id}
            nombre={prod.nombre}
            tipo={prod.descripcion}
            precio={prod.precio}            
            />
          */
          <tr key={prod.id}>
          <td>{prod.id}</td>
          <td>{prod.nombre}</td>
          <td>{prod.descripcion}</td>
          <td>{prod.precio}</td>
          <td className="elemento contenedor-botones">
            <button className="btn btn-modificar">➕</button>
            <button className="btn btn-modificar">✏️{/*&#128393;*/}</button>
            <button className="btn btn-danger">🗑️</button>
          </td>
        </tr>
          
          )}
          
          </tbody>
        </table>
      </div>
    </>
  );
}
