import {configureStore} from "@reduxjs/toolkit";
import {productsSlice} from "./slices/products/productsSlice.js";
import {filteredProductsSlice} from "./slices/filteredProducts/filteredProductsSlice.js";
import {productsTypeSlice} from "./slices/productsType/productsTypeSlice.js";
import {pageDetailsSlice} from "./slices/pageDetails/pageDetailsSlice.js";

export const store = configureStore({
  reducer: {
    pageDetails: pageDetailsSlice.reducer,
    // products: productsSlice,
    // productsType: productsTypeSlice,
    // filteredProducts: filteredProductsSlice
  }
})
export default store;