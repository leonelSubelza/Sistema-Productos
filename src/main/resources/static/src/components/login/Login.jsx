import React, { useState } from 'react'

import '../../styles/login/Login.css'
import logo from "../../img/TiendaHumilde-logo.png";
import { iniciarSesion } from '../../service/GestionUsuarios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarSesion = () => {
    if (email !== "") {
      iniciarSesion(email, password)
    } else {
      alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
    }
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
