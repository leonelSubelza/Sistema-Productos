import './App.css';
import logo from "./img/TiendaHumilde-logo.png";

function App() {
  return (
    <div className="padre">
      <header className='header'>
        <div className='cabecera'>
          <div className='logo'>
            <a href="/#"><img src={logo} alt="Logo" /></a>
          </div>
          <div className='desblegable'>
            <button className='desplegable-inicio-sesion'><i class="bi bi-gear"></i></button>
          </div>
        </div>
        <nav className='nav'>
          <a href="/#">Inicio</a>
          <a href="/#">Productos</a>
          <a href="/#">Contacto</a>
        </nav>
      </header>
      <section className='section'>
        <div className='filtro'>
          <div className='buscado-lupa-juntos'>
            <input className='filtro-input' type="text" placeholder='Buscar' />
            <button className='filtro-lupa'><i class="bi bi-search"></i></button>
          </div>
        </div>
        <div className='articulos'>
          <article class="articulo">
            <img className='articulo-img' src="https://picsum.photos/seed/picsum/100/100" alt="img" />
            <p className='articulo-nombre-producto'>Nombre producto</p>
            <p className='articulo-nombre-categoria'>Nombre categoria</p>
            <p className='articulo-precio'>Precio</p>
          </article>
          <article class="articulo">
            <img className='articulo-img' src="https://picsum.photos/seed/picsum/100/100" alt="img" />
            <p className='articulo-nombre-producto'>Nombre producto</p>
            <p className='articulo-nombre-categoria'>Nombre categoria</p>
            <p className='articulo-precio'>Precio</p>
          </article>
          <article class="articulo">
            <img className='articulo-img' src="https://picsum.photos/seed/picsum/100/100" alt="img" />
            <p className='articulo-nombre-producto'>Nombre producto</p>
            <p className='articulo-nombre-categoria'>Nombre categoria</p>
            <p className='articulo-precio'>Precio</p>
          </article>
          <article class="articulo">
            <img className='articulo-img' src="https://picsum.photos/seed/picsum/100/100" alt="img" />
            <p className='articulo-nombre-producto'>Nombre producto</p>
            <p className='articulo-nombre-categoria'>Nombre categoria</p>
            <p className='articulo-precio'>Precio</p>
          </article>

          <nav className='navegacion'>
            <a href="/#">Inicio</a>
            <a href="/#">1</a>
            <a href="/#">2</a>
            <a href="/#">3</a>
            <a href="/#">4</a>
            <a href="/#">Final</a>
          </nav>
        </div>
      </section>
      <footer className='footer'>
        <div className='pie'>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Licencia Creative Commons" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;