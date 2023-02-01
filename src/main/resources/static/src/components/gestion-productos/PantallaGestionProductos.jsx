import { useEffect, useState } from "react";
import "../../styles/PantallaGestionProductos.css";
import VentanaEmergenteGestionProductos from "./VentanaEmergenteGestionProductos.jsx";
import { cargarProductos,borrarProductos } from "../../service/GestionProductos";

export default function PantallaGestionProductos() {
  const [productos, setProductos] = useState([]);

  const [showVentanaAgregar,setShowVentanaAgregar] = useState(false)

  const actualizarTabla = () => {
        
    cargarProductos().then(response => {
      setProductos(response);
      console.log('cargando');
      setShowVentanaAgregar(false);
    });
  }

  const borrarProducto=(id)=>{
    for(let i=0; i<productos.length; i++){
      if(productos[i].id === id){
        borrarProductos(id).then(async ()=>{
          console.log('cargando');
          cargarProductosTabla();
        })
        return
      }
    }

  }

  function cargarProductosTabla(){
    cargarProductos().then(response => setProductos(response));
  }

  useEffect(() => {
    //ARREGLAR QUE SE CONSUME LA API INFINITAMENTE
    cargarProductosTabla();
    
    ;
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
                  <button className="btn btn-danger"
                  onClick={() => borrarProducto(prod.id)}
                  >🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <VentanaEmergenteGestionProductos mostrarVentana={showVentanaAgregar} cerrarVentana={()=> actualizarTabla()}/>
    </>
  );
}

  /* lapiz: &#128393;*/

