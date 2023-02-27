import { URL } from "./Configuracion";

export async function iniciarSesion(email, password) {
  let datos = {};
  datos.email = email;
  datos.password = password;

  const request = await fetch(URL + '/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const respuesta = await request.text();
  console.log("respuesta: " + respuesta);
  if (respuesta !== 'FAIL') {
    localStorage.token = respuesta;
    localStorage.email = datos.email;
    window.location.href = '/administrador'
  } else {
    alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
  }

}