import {createSlice} from "@reduxjs/toolkit";

// initialState: Map<key: {totalPaginas: 0}, valor: Products[]>
//PRODUCTOS CON PAGINACION

const INITIAL_STATE = {
  value: {
    totalPag: 0,
    pages: []
  },
  loading: false,
}

export const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      const {totalPag, products} = action.payload;
      state.value.totalPag = totalPag;
      state.value.pages.push(products);
    },
    resetProductsSlice: (state) => {
      state.value = INITIAL_STATE.value;
      state.loading = INITIAL_STATE.loading;
    },
    // Enviar {nroPag:0, products: []}
    addPageToProducts: (state, action) => {
      const { nroPag, products } = action.payload;
      const newPage = {
        nroPag: nroPag,
        products: products
      }
      if (state.value.pages[nroPag]) {
        state.value.pages[nroPag] = [];
      }
      state.value.pages[nroPag] = newPage;
    },
    removePageSlice: (state, action) => {
      const { nroPag } = action.payload;
      state.value.pages = state.value.pages.filter(p => p.nroPag!==nroPag);
    },
    setIsDataLoadingSlice: (state, action) => {
      state.loading = action.payload;
    },
    setTotalPagesSlice: (state, action) => {
      state.value.totalPag = action.payload;
    }
  }
})

export const {
  setProducts,
  resetProductsSlice,
  addPageToProducts,
  removePageSlice,
  setIsDataLoadingSlice,
  setTotalPagesSlice
} = productsSlice.actions;