import { URL } from "./Configuracion";

//GET
export const cargarObjetos = async (direccion) => {
  try {
    const request = await fetch(URL + "/" + direccion, {
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
    throw error;
  }
};

//Este metodo se puede usar para actualizar=PUT y crear=POST, POST retorna el obj agregado, PUT no
export const crearObjeto = async (direccion, obj, metodo) => {
  try {
    const request = await fetch(URL + "/" + direccion, {
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
    throw error;
  }
};

//DELETE
export const borrarObjeto = async (direccion, id) => {
  try {
    await fetch(URL + "/" + direccion + "/" + id, {
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

export const iniciarSesion = async () => {

}
