import React, { useContext, useState } from 'react'

import '../../styles/login/Login.css'
import logo from "../../img/TiendaHumilde-logo.png";
import { iniciarSesion } from '../../service/GestionUsuarios';
import { funcionesContext } from '../../context/FuncionesTablaContext';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1234");

  const { sesionIniciada, setSesionIniciada } =
  useContext(funcionesContext);
  const navigate = useNavigate();
  

  const manejarSesion = () => {
    if (email !== "") {
      if(iniciarSesion(email, password)){
        setSesionIniciada(true);
        console.log("se debería iniciar sesion en true");
        navigate("/administrador")
      }
    } else {
      alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
    }
  }

  const volverInicio = () => {
    navigate("/")
  }


  return (
    <div className="fondo">
      <div className='container-img-login'>

        <div className="imagen">
          <img src="https://random.imagecdn.app/200/400" alt="" />
        </div>
        <div className='container-login'>
          <img src={logo} alt="" className='login-logo' />
          <form className='form-login'>
            <div className="mb-3">
              <label for="form-email" className="form-label">Email</label>

              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="form-email" placeholder="name@example.com" />

            </div>
            <div className="mb-3">
              <label for="form-password" className="form-label">Contraseña</label>

              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="form-password" placeholder='Contraseña' />

            </div>
            <div className="mb-3">
              <button onClick={manejarSesion} type="button" className="btn btn-dark">Iniciar Sesión</button>
              <button onClick={volverInicio} type="button" className="btn btn-dark" style={{ marginLeft: '10px' }}>Volver</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
