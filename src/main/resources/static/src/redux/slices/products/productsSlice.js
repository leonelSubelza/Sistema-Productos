import {createSlice} from "@reduxjs/toolkit";

// initialState: Map<key: {totalPaginas: 0}, valor: Products[]>
//PRODUCTOS CON PAGINACION

const INITIAL_STATE = {
  totalPag: 0,
  // pages: [page{nroPagina:0,products:[]}]
  pages: [],
}

export const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      const {totalPag, products} = action.payload;
      state.totalPag = totalPag;
      state.pages = products;
    },
    resetProductsSlice: () => {
      return INITIAL_STATE;
    },
    // Enviar {nroPag: nroPag, totalPag: totalPag, products: products}
    addPageToProducts: (state, action) => {
      const { nroPag, totalPag, pageToSave } = action.payload;
      // if (state.pages[nroPag]) {
      //   state.pages[nroPag] = {};
      // }
      state.totalPag = totalPag;
      state.pages[nroPag] = pageToSave;
    },
    removePageSlice: (state, action) => {
      const { nroPag } = action.payload;
      state.pages = state.pages.filter(p => p.nroPag!==nroPag);
    },
    setTotalPagesSlice: (state, action) => {
      state.totalPag = action.payload;
    }
  }
})

export const {
  setProducts,
  resetProductsSlice,
  addPageToProducts,
  removePageSlice,
  setTotalPagesSlice
} = productsSlice.actions;