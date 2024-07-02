import { URL } from "./Configuracion";

export async function iniciarSesion(email, password) {
  let datos = {
    email: email,
    password: password
  };


  try {
    const response = await fetch(URL + "/api/usuarios/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) {
      // console.error('Error:', response.statusText);
      return false;
    }

    let user = await response.json();
    console.log(user);
    return true
  } catch (error) {
    console.error('Error:', error);
    return false;
  }

/*  fetch(URL + "/api/usuarios/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then(response => {
    // Verificar si la respuesta es exitosa (código de estado 200)
    response.json()
  })
    .then(res => {
      console.log(res)
      return true
    })
  .catch(error => {
    console.error('Error:', error);
    return false;
  });*/
  return false;
}