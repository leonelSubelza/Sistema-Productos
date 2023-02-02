import { URL } from "./Configuracion";

//GET
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

//Este metodo se puede usar para actualizar y crear
//POST, PUT
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

//DELETE
export const borrarProductos = async (id) => {
    await fetch(URL + "/productos/"+id, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });
  
  };
  