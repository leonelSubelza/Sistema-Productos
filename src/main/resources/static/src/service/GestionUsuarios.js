import { URL } from "./Configuracion";

export async function iniciarSesion(email, password) {
  let datos = {};
  datos.email = email;
  datos.password = password;

  fetch(URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    if (response.ok) {
      // Procesar la respuesta JSON
      return response.json();
    } else {
      // Si la respuesta no es exitosa, lanzar un error con el mensaje de error
      throw new Error('Error al iniciar sesión');
    }
  })
  .then(data => {
    return true;
  })
  .catch(error => {
    console.error('Error:', error);
    return false;
  });

  // const request = await fetch(URL + '/api/login', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(datos)
  // });

  // const respuesta = await request.text();
  // console.log("respuesta: " + respuesta);
  // if (respuesta !== 'FAIL') {
  //   localStorage.token = respuesta;
  //   localStorage.email = datos.email;
  //   window.location.href = '/administrador'
  // } else {
  //   alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
  // }

}