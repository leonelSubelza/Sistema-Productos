import {useDispatch} from "react-redux";
import {setProducts,
  resetProductsSlice,
  addPageToProducts,
  removePageSlice,
  setTotalPagesSlice} from "./productsSlice.js";

export const useProductsActions = () => {
  const dispatcher = useDispatch();

  const updateProducts =  (totalPag,newProducts) => {
    dispatcher(setProducts({totalPag:totalPag,products:newProducts}));
  };

  const resetProducts = () => {
    dispatcher(resetProductsSlice());
  }
  const addNewPageToProducts = (nroPag, totalPag, pageToSave) => {
    dispatcher(addPageToProducts({nroPag: nroPag, totalPag: totalPag, pageToSave: pageToSave}));
  }

  const removePageFromProducts = (nroPag) => {
    dispatcher(removePageSlice(nroPag));
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
    updateTotalPages }
}