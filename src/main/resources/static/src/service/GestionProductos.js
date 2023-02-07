import { URL } from "./Configuracion";

//Al hacer consultas a la api, los errores se manejan en estos métodos por lo que al utilizarlos en otras clases no hace falta usar catch

//GET
export const cargarProductos = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
  return [];
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
export const crearProductos = async (obj, metodo) => {
  try {
    const request = await fetch(URL + "/productos", {
      method: metodo,
      body: JSON.stringify(obj),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });
    if (metodo === "POST") {
      let prod = await request.json();
      return prod;
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE
export const borrarProductos = async (id) => {
  try {
    await fetch(URL + "/productos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
