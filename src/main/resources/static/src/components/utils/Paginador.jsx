import React from 'react'
import '../../styles/ventana-cliente/paginacion.css'
// function PaginadorProductos({ productosPorPagina, paginaActual, setpaginaActual, totalProductos }) {
function Paginador({ setPaginaAnterior, setPaginaSiguiente, setPaginaActual,
                              numeroTotalDePaginas, paginaActual, show, color}) {

  const estilos = {
    pageLink: {
      color: color
    },
    pageLinkActive: {
      backgroundColor: color,
      color: "#fff",
      border: `1px solid ${color}`
    }
  }

  const onSiguientePagina = () => {
    return setPaginaSiguiente(paginaActual + 1);
  }
  const onAnteriorPagina = () => {
    return setPaginaAnterior(paginaActual - 1);
  }

  const onEspecificarPagina = (num) => {
    return setPaginaActual(num);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className={`pagination ${show && 'show'}`}>
        <li className={`page-item`}>
          <button
            style={estilos.pageLink}
            onClick={()=>onAnteriorPagina()}
            disabled={paginaActual === 1}
            className="page-link"
          >
            Anterior
          </button>
        </li>
        {/*Creo un array dado un número*/}
        {Array.from({ length: numeroTotalDePaginas }, (_, index) => index + 1)
          .map(nPagina => (
          <li
              key={nPagina}
              onClick={()=>onEspecificarPagina(nPagina)}
              className={`page-item ${nPagina === paginaActual ? 'active' : ''}`}>
            <button
              style={nPagina === paginaActual ? estilos.pageLinkActive : {} && estilos.pageLink}
              className={`page-link`}
            >
              {nPagina}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            style={estilos.pageLink}
            onClick={()=>onSiguientePagina()} disabled={paginaActual >= numeroTotalDePaginas}
            className="page-link"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default Paginador;
