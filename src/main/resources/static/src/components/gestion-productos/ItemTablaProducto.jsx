export default function ItemTablaProducto(id,nombre,tipo,precio) {
  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{tipo}</td>
      <td>{precio}</td>
      <td className="elemento contenedor-botones">
        <button className="btn btn-modificar">Modificar</button>
        <button className="btn btn-modificar">Borrar</button>
      </td>
    </tr>
  );
}
