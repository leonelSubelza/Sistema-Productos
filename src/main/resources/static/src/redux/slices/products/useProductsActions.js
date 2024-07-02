import {useDispatch} from "react-redux";
import {setProducts,
  resetProductsSlice,
  addPageToProducts,
  removePageSlice,
  setIsDataLoadingSlice,
  setTotalPagesSlice} from "./productsSlice.js";

export const useProductsActions = () => {
  const dispatcher = useDispatch();

  const updateProducts =  (totalPag,newProducts) => {
    dispatcher(setProducts({totalPag:totalPag,products:newProducts}));
  };

  const resetProducts = () => {
    dispatcher(resetProductsSlice());
  }
  const addNewPageToProducts = (nroPag, products) => {
    dispatcher(addPageToProducts({nroPag: nroPag, products: products}));
  }

  const removePageFromProducts = (nroPag) => {
    dispatcher(removePageSlice(nroPag));
  }

  const updateProductsIsDataLoading = (value) => {
    dispatcher(setIsDataLoadingSlice(value));
  }

  const updateTotalPages = (value) => {
    dispatcher(setTotalPagesSlice(value))
  }

//   LO DEMÁS CREATE, UPDAATE, DELETE Debería estar en el Tablacontext porque eso se hace en la parte de admin nomas
  return {
    updateProducts,
    resetProducts,
    addNewPageToProducts,
    removePageFromProducts,
    updateProductsIsDataLoading,
    updateTotalPages }
}