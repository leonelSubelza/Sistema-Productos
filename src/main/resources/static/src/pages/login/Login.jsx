import React, {useEffect, useState} from 'react'

import './Login.css'
import logo from "../../img/TiendaHumilde-logo.png";
import { iniciarSesion } from '../../service/GestionUsuarios.js';
import { useNavigate } from 'react-router';
import {usePageDetailsActions} from "../../redux/slices/pageDetails/usePageDetailsActions.js";
import {useSelector} from "react-redux";
import {PrivateRoutes} from "../../router/routes.js";
import {IMAGES_URL_PAGEDETAILS} from "../../service/Configuracion.js";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const pageDetails = useSelector(store => store.pageDetails);
  const navigate = useNavigate();
  const [loginLogo, setLoginLogo] = useState('')

  const { updateValuePageDetail } = usePageDetailsActions();
  const manejarSesion = () => {
    if (email !== "") {
      iniciarSesion(email, password)
        .then(res => {
          if(res){
            // setSesionIniciada(true);
            updateValuePageDetail("sessionStarted",true)
            navigate(PrivateRoutes.PRODUCTS)
          }else{
            alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const volverInicio = () => {
    navigate("/")
  }

  useEffect(() => {
    if (pageDetails && pageDetails.sessionStarted) {
      // Si ya inicio sesion se le redirige a /administrador/products
      navigate(PrivateRoutes.PRODUCTS)
    }
    if(!pageDetails.pageLogo || pageDetails.pageLogo===''){
      setLoginLogo(logo);
    }else{
      setLoginLogo(IMAGES_URL_PAGEDETAILS+pageDetails.pageLogo+"?"+"timestamp="+new Date().getTime())
    }
  }, []);

  return (
    <div className="fondo">
      <div className='container-img-login'>

        <div className="imagen">
          <img src="https://random.imagecdn.app/200/400" alt="" />
        </div>
        <div className='container-login'>
          <img src={loginLogo} alt="" className='login-logo' />
          <form className='form-login'>
            <div className="mb-3">
              <label htmlFor={"form-email"} className="form-label">Email</label>

              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="form-email" placeholder="name@example.com" />

            </div>
            <div className="mb-3">
              <label htmlFor={"form-password"} className="form-label">Contraseña</label>

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
