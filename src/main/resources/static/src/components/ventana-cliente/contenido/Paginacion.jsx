import React from 'react';
import '../../../styles/ventana-cliente/paginacion.css'

const Paginacion = ({ productosPorPagina, paginaActual, setpaginaActual, totalProductos }) => {

  const numeroPaginas = [];

  // relleno el numero de paginas que se mostraran
  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroPaginas.push(i)
  }

  const onSiguientePagina = () => {
    setpaginaActual(paginaActual + 1);
  }
  const onAnteriorPagina = () => {
    setpaginaActual(paginaActual - 1);
  }

  const onEspecificarPagina = (num) => {
    setpaginaActual(num);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item`} disable><button onClick={onAnteriorPagina} disabled={paginaActual === 1} className="page-link">Anterior</button></li>
        {numeroPaginas.map(nPagina => (
          <li onClick={() => onEspecificarPagina(nPagina)} key={nPagina} className={`page-item ${nPagina === paginaActual ? 'active' : ''}`}><button className={`page-link`}>{nPagina}</button></li>
        ))}
        <li className="page-item"><button onClick={onSiguientePagina} disabled={paginaActual >= numeroPaginas.length} className="page-link">Siguiente</button></li>
      </ul>
    </nav>
  );
}

export default Paginacion;