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
/*
  const prod = fetch(URL + "/productos", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  })
  .then((response) => response.json())
  .catch((error) => {
    alert(error)
  });
  return prod;
  */
};

//Este metodo se puede usar para actualizar=PUT y crear=POST, POST retorna el obj agregado, PUT no
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
  if(metodo==='POST'){
    let prod = await request.json();
    return prod;
  }
  
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
  