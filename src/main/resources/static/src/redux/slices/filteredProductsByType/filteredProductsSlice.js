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

const filteredProductsByTypeKey = {
  id:0,
  nombre: '',
  totalPag:0,
  pages: []
}

const INITIAL_STATE = {
  value: [],
}

// PRODUCTOS FILTRADOS CON PAGINACION
export const filteredProductsSlice = createSlice({
  name:"filteredProducts",
  initialState: INITIAL_STATE,
  reducers: {
    setFilteredProductsByTypeSlice: (state, action) => {
      return action.payload;
    },
    addPageToFilteredProductByTypeSlice: (state, action) => {
      const { keyValues, nroPag, pageToSave } = action.payload;
      const indexProductTypeFiltered = state.findIndex(filteredPage => filteredPage.id === keyValues.id);

      if(!state[indexProductTypeFiltered]){
        state[indexProductTypeFiltered] = {
          id: keyValues.id,
          nombre: keyValues.id,
          totalPag: keyValues.totalPag,
          pages: [],
        };
      }
      state[indexProductTypeFiltered].pages[nroPag] = pageToSave;
    },
    removePageToFilteredProductByTypeSlice: (state, action) => {
      const { indexProductTypeFiltered, nroPag} = action.payload;
      const pagesFromFilteredPage = state[indexProductTypeFiltered].pages;
      state[indexProductTypeFiltered].pages = pagesFromFilteredPage.filter( (page) => page.nroPag===nroPag);
    },
    resetFilteredProductByTypeSlice: () => {
      return INITIAL_STATE;
    }
  }
})

export const {
  setFilteredProductsByTypeSlice,
  addPageToFilteredProductByTypeSlice,
  removePageToFilteredProductByTypeSlice,
  resetFilteredProductByTypeSlice
} = filteredProductsSlice.reducer;