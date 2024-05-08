import TablaTipoProducto from './gestionarTipoProductos/TablaTipoProductos'
import Navbar from './dashboard/NavBar'
import "../../styles/ventana-productos/Pantallas.css";
import { useContext, useEffect } from 'react';
import { funcionesContext } from '../../context/FuncionesTablaContext';
import { Navigate, useNavigate } from 'react-router';

function PantallaGestionTipoProducto() {
  const navigate = useNavigate();
  const { sesionIniciada } =
    useContext(funcionesContext);

  useEffect(()=>{
    if(!sesionIniciada){
      navigate("/");
      return;
    }
  },[])

  return (
    <div className='contenedor-pantalla-productos'>
      <Navbar />
      <TablaTipoProducto />
    </div>
  )
}

export default PantallaGestionTipoProducto
