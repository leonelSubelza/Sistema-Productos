import { useState } from "react";
import { estadosProductos } from "../../service/EstadosProductos";
import { crearProductos } from "../../service/GestionProductos";
import "../../styles/VentanaEmergenteGestionProductos.css";

export default function VentanaEmergenteGestionProductos({mostrarVentana,cerrarVentana}) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState("");

  const agregarProducto = (e) => {
    e.preventDefault();
    if(nombre === '' || precio === '0' || tipo === 'Sin seleccionar'){
        return cerrarVentana(false);
    }
    const prod = {
      id: 0,
      nombre: nombre,
      tipo: tipo,
      precio: precio,
    };
    console.log(prod);
    crearProductos(prod,'POST').then(() => cerrarVentana(false));
  };

  return (
    <form
      className={`formulario-ventana-emergente-gestion-productos ${mostrarVentana ? 'formulario-ventana-emergente-gestion-productos-active' : ''}`}
      onSubmit={agregarProducto}
    >
      <div className="formulario-inputs">
        <div className="formulario_grupo">
          <label for="nombre">Escriba el nombre del producto</label>
          <input
            type="text"
            name="nombre"
            placeholder="Escriba el nombre del producto"
            autoComplete="off"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
          />
        </div>
        <div className="formulario_grupo">
          <label for="tipo">Tipo</label>
          <select
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
        </div>
        <div className="formulario_grupo">
          <label for="precio">Precio</label>
          <input
            type="text"
            name="precio"
            placeholder="Escriba el precio del producto"
            autoComplete="off"
            value={precio}
            onChange={(ev) => setPrecio(ev.target.value)}
          />
        </div>
      </div>
      <button className="btn-agregar-producto" type="submit">
        Agregar Producto
      </button>
    </form>
  );
}
