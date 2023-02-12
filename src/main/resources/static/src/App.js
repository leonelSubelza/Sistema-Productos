import './App.css';

// import PantallaGestionProductos from './components/gestion-productos/PantallaGestionProductos'
import VentanaCliente from './components/ventana-cliente/VentanaCliente';

function App() {
  return (
    <div className="padre">
      {/* <PantallaGestionProductos /> */}
      <VentanaCliente />
    </div>
  );
}

export default App;