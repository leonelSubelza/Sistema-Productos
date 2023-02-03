import React from 'react';
const Filtro = () => {
  return (
    <div className='buscado-lupa-juntos'>
      <input className='filtro-input' type="text" placeholder='Buscar' />
      <button className='filtro-lupa'><i class="bi bi-search"></i></button>
    </div>
  );
}

export default Filtro;