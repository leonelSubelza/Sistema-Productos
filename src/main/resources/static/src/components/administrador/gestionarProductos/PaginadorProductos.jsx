import React, {useEffect} from 'react'

// function PaginadorProductos({ productosPorPagina, paginaActual, setpaginaActual, totalProductos }) {
function PaginadorProductos({ setPaginaAnterior, setPaginaSiguiente, setPaginaActual,
                              numeroTotalDePaginas, paginaActual, show}) {
  // const numeroPaginas = [];

  // relleno el numero de paginas que se mostraran
/*  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroPaginas.push(i)
  }
*/
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
        <li className={`page-item`} disabled>
          <button onClick={()=>onAnteriorPagina()} disabled={paginaActual === 1} className="page-link">
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
            <button className={`page-link`}>{nPagina}</button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={()=>onSiguientePagina()} disabled={paginaActual >= numeroTotalDePaginas} className="page-link">
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default PaginadorProductos
