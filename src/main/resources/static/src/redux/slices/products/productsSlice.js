import {createSlice} from "@reduxjs/toolkit";
import {cargarObjetosConPaginacion} from "../../service/GestionProductos.js";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    loadProducts: async (state, action) => {
      return await cargarObjetosConPaginacion('productos',action.page,action.size).content;
    },

    //este abria que usarlo para cargar los products con el obj tipoProducto
    setProducts(state, action) {
      return action.payload;
    },
  }
})