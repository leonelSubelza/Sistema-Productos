import {createSlice} from "@reduxjs/toolkit";

// initialState: Map<key: {totalPaginas: 0, nroPaginaActual:0}, valor: Products[]>
//PRODUCTOS CON PAGINACION

const INITIAL_STATE = {
  products: new Map,
  loading: false,
}

export const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    resetProducts(state, action) {
      return INITIAL_STATE;
    },
    addPageToProducts: (state, action) => {
      const { key, products } = action.payload;
      if (!state.has(key)) {
        state.set(key, []);
      }
      state.get(key).push(products);
    },
    removeProductKey(state, action) {
      const { key } = action.payload;
      state.delete(key);
    },
    setIsDataLoading(state,action) {
      return [...state, action.payload];
    }
  }
})

export const {
  setProducts,
  resetProducts,
  addPageToProducts,
  removeProductKey,
  setIsDataLoading
} = productsSlice.actions;
export default productsSlice.reducer;