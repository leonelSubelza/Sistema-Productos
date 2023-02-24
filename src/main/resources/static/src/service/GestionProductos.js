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
export const crearObjeto = async (direccion, obj, imagen, metodo) => {
  try {
    //const boundary = Math.random().toString(36).substring(2);
    /*
    const boundary = 100;
    const formData = new FormData();
    formData.append('producto',JSON.stringify(obj))
    if(imagen!==undefined || imagen!==null){
      formData.append('file', imagen);
    }
    const request = await fetch(URL + "/" + direccion, {
      method: metodo,
      body: formData,
      headers:{
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data; boundary=MyBoundary'
      }
    });
*/
    /*
     */
    const formData = new FormData();

    if (direccion === "productos") {
      formData.append("id", obj.id);
      formData.append("nombre", obj.nombre);
      formData.append("descripcion", obj.descripcion);
      formData.append("imagen", obj.imagen);
      formData.append("precio", obj.precio);
      formData.append("genero", obj.genero);
      formData.append("tipoProducto.id", obj.tipoProducto.id);
    }
    if (direccion === "tiposProductos") {
      formData.append("id", obj.id);
      formData.append("nombre", obj.nombre);
    }

    //Si la imagen es
    if (imagen !== null) {
      formData.append("imagenObj", imagen); // archivo es el objeto File de la imagen seleccionada
    }
    const request = await fetch(URL + "/" + direccion, {
      method: metodo,
      body: formData,
      headers: {
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
