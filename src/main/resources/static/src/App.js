import './App.css';
import Contenido from './components/ventana-cliente/contenido/Contenido';
import Footer from './components/ventana-cliente/footer/Footer';
import Header from './components/ventana-cliente/header/Header';

function App() {
  return (
    <div className="padre">
      <Header />
      <Contenido />
      <Footer />
    </div>
  );
}

export default App;