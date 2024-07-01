import {createSlice} from "@reduxjs/toolkit";

// initialState: Map< key:{TipoProducto, totalPag:0, pagActual:0}, valor: Map<key: {nroPagina:0}, valor: Products[]>>

// PRODUCTOS FILTRADOS CON PAGINACION
export const filteredProductsSlice = createSlice({
  name:"filteredProducts",
  initialState: new Map,
  reducers: {
    setFilteredProducts: (state, action) => {
      return action.payload;
    }
  }
})

export const {setFilteredProducts} = filteredProductsSlice.reducer;