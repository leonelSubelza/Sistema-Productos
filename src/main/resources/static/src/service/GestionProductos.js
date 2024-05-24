import { URL } from "./Configuracion";

//GET retorna un listado de prod dada una pag y una cantidad
export const cargarObjetosConPaginacion = async (direccion,page,size,idTipoProducto) => {
  try {
    let url = URL + "/" + direccion+"?page="+page+"&size="+size;
    if(idTipoProducto){
      url =url+"&productTypeId="+idTipoProducto;
    }
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let prod = await request.json();
    return prod;
  } catch (error) {
    throw error;
  }
};

export const cargarTodosLosObjetos = async (direccion) => {
  try {
    const request = await fetch(URL + "/" + direccion, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
    const formData = new FormData();

    if (direccion === "productos") {
      formData.append("id", obj.id);
      formData.append("nombre", obj.nombre);
      formData.append("descripcion", obj.descripcion);
      formData.append("imagen", obj.imagen);
      formData.append("precio", obj.precio);
      formData.append("genero", obj.genero);
      formData.append("productTypeId", obj.productTypeId);
    }
    if (direccion === "tiposProductos") {
      formData.append("id", obj.id);
      formData.append("nombre", obj.nombre);
    }

    if(imagen!==undefined){
      formData.append("imagenObj", imagen);
    }
    const request = await fetch(URL + "/" + direccion, {
      method: metodo,
      body: formData,
    });
    if (metodo === "POST") {
      let prod = await request.json();
      return prod;
    }
    return;
  } catch (error) {
    console.log(error)
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