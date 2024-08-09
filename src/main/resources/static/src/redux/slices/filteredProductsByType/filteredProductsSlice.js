import {createSlice} from "@reduxjs/toolkit";

// initialState: Map< key:{TipoProducto, totalPag:0, pagActual:0}, valor: Map<key: {nroPagina:0}, valor: Products[]>>

/*
filteredProductsSlice: [
	{
		id: 1,
		nombre: "Remera",
		totalPag: 3,
		pages: [
			{
			nroPag: 0,
			products: [ ...products]
			 },
			 ]
	},
	{
		id: 1,
		nombre: "Pantalon",
		totalPag: 3,
		pages: [
			{
			nroPag: 0,
			valor: [ ...products]
			 },
			 ]
	}
* */

/*const filteredProductsKey = {
  id:0,
  nombre: '',
  totalPag:0,
  pages: []
}*/

const INITIAL_STATE = {
  id:0,
  nombre: '',
  totalPag:0,
  pages: []
}

// PRODUCTOS FILTRADOS CON PAGINACION
export const filteredProductsSlice = createSlice({
  name:"filteredProducts",
  initialState: INITIAL_STATE,
  reducers: {
    setFilteredProductsSlice: (state, action) => {
      return action.payload;
    },
    addPageToFilteredProductSlice: (state, action) => {
      const {id, nombre, totalPag, pageToSave, nroPag} = action.payload;
      if (state.id !== id) {
        state.pages = [];
      }
      state.id = id;
      state.nombre = nombre;
      state.totalPag = totalPag;
      let pagesAux = [...state.pages];
      pagesAux[nroPag] = pageToSave;
      state.pages = pagesAux;
    },
    removePageToFilteredProductSlice: (state, action) => {
      const { indexProductTypeFiltered, nroPag} = action.payload;
      const pagesFromFilteredPage = state[indexProductTypeFiltered].pages;
      state[indexProductTypeFiltered].pages = pagesFromFilteredPage.filter( (page) => page.nroPag===nroPag);
    },
    resetFilteredProductSlice: () => {
      return INITIAL_STATE;
    }
  }
})

export const {
  setFilteredProductsSlice,
  addPageToFilteredProductSlice,
  removePageToFilteredProductSlice,
  resetFilteredProductSlice
} = filteredProductsSlice.actions;