import {createSlice} from "@reduxjs/toolkit";

// initialState: Map<key: {totalPaginas: 0, nroPaginaActual:0}, valor: Products[]>
//PRODUCTOS CON PAGINACION

const INITIAL_STATE = {
  value: {},
  loading: false,
}

export const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    resetProductsSlice: (state) => {
      state.value = INITIAL_STATE.value;
      state.loading = INITIAL_STATE.loading;
    },
    addPageToProducts: (state, action) => {
      const { key, products } = action.payload;
      if (!state.value[key]) {
        state.value[key] = [];
      }
      state.value[key].push(...products);
    },
    removeProductKey: (state, action) => {
      const { key } = action.payload;
      delete state.value[key];
    },
    setIsDataLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const {
  setProducts,
  resetProductsSlice,
  addPageToProducts,
  removeProductKey,
  setIsDataLoading
} = productsSlice.actions;