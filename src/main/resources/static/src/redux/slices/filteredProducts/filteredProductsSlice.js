import {createSlice} from "@reduxjs/toolkit";

// initialState: Map< key:{TipoProducto, totalPag:0, pagActual:0}, valor: Map<key: {nroPagina:0}, valor: Products[]>>

const filteredProductsKey = {
  id:0,
  nombre: '',
  totalPag:0,
}

const INITIAL_STATE = {
  value: new Map(),
  loading: false,
}

// PRODUCTOS FILTRADOS CON PAGINACION
export const filteredProductsSlice = createSlice({
  name:"filteredProducts",
  initialState: INITIAL_STATE,
  reducers: {
    setFilteredProducts: (state, action) => {
      return action.payload;
    }
  }
})

export const {setFilteredProducts} = filteredProductsSlice.reducer;