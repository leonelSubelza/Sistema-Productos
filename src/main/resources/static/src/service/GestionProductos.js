import { URL } from "./Configuracion";

export const cargarProductos = async () => {
  const request = await fetch(URL + "/productos", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  });

  let prod = await request.json();
  return prod;
};

export const crearProductos = async (obj,metodo) => {
  const request = await fetch(URL + "/productos", {
    method: metodo,
    body: JSON.stringify(obj),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  });

  let prod = await request.json();
  return prod;
};

export const borrarProductos = async (id) => {
    const request = await fetch(URL + "/productos/"+id, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });
  
  };
  