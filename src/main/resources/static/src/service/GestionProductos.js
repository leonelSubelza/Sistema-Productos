import {CLIENT_CANT_OBJ_TO_SHOW, URL} from "./Configuracion";

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

export const cargarObjetosPorCampoYTipoProductoConPaginacion = async (direccion,nombreCampo,valorCampo,page,size,idTipoProducto) => {
  try {
    //byProductTypeAndNombre?page=0&size=2&productTypeId=1&nombre=PRUEBA
    // console.log("request que se hace:")
    // console.log(URL + "/" + direccion+"?page="+page+"&size="+size+"&productTypeId="+idTipoProducto+"&"+nombreCampo+"="+valorCampo)
    let url = URL + "/" + direccion+"?page="+page+"&size="+size+"&productTypeId="+idTipoProducto+"&"+nombreCampo+"="+valorCampo;
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
}

export const loadFilteredProducts = async (valuesToAdd,page,size) => {
  try{
    const params = {
      page: page,
      size: size,
      ...valuesToAdd
    };

// Construir la URL con los parámetros de consulta
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${URL}/search?${queryString}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }catch(err) {
    throw err;
  }
}