import React from 'react'

import '../../styles/login/Login.css'
import logo from "../../img/TiendaHumilde-logo.png";

function Login() {
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
              <input type="email" className="form-control" id="form-email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label for="form-password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="form-password" placeholder='Contraseña' />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-dark">Iniciar Sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
