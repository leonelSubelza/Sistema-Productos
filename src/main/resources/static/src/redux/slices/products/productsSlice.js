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
      state.pages.push(products);
    },
    resetProductsSlice: () => {
      return INITIAL_STATE;
    },
    // Enviar {nroPag:0, products: []}
    addPageToProducts: (state, action) => {
      const { nroPag, products } = action.payload;
      const newPage = {
        nroPag: nroPag,
        products: products
      }
      if (state.pages[nroPag]) {
        state.pages[nroPag] = [];
      }
      state.pages[nroPag] = newPage;
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