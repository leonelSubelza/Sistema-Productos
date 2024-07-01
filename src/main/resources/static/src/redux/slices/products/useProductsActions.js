import {useDispatch} from "react-redux";
import {setProducts,
  resetProductsSlice,
  addPageToProducts,
  removeProductKey,
  setIsDataLoading} from "./productsSlice.js";

export const useProductsActions = () => {
  const dispatcher = useDispatch();

  const updateProducts =  (newProducts) => {
    dispatcher(setProducts(newProducts));
  };

  const resetProducts = () => {
    dispatcher(resetProductsSlice());
  }

  const addNewPageToProducts = (nroPag, products) => {
    dispatcher(addPageToProducts({key: nroPag, products: products}));
  }

  const removePageFromProducts = (key) => {
    dispatcher(removeProductKey(key));
  }

  const updateProductsIsDataLoading = (value) => {
    dispatcher(setIsDataLoading(value));
  }

//   LO DEMÁS CREATE, UPDAATE, DELETE Debería estar en el Tablacontext porque eso se hace en la parte de admin nomas
  return { updateProducts,resetProducts,addNewPageToProducts,removePageFromProducts,updateProductsIsDataLoading }
}