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

    await response.json();
    return true
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}