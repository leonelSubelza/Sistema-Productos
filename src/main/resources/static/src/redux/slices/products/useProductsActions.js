import {useDispatch} from "react-redux";
import {setProducts,
  resetProducts,
  addPageToProducts,
  removeProductKey,
  setIsDataLoading} from "./productsSlice.js";

export const useProductsActions = () => {
  const dispatcher = useDispatch();

  const updateProducts =  (newProducts) => {
    dispatcher(setProducts(newProducts));
  };

  const resetProductsPages = () => {
    dispatcher(resetProducts());
  }

  const addNewPageToProductsPages = (nroPag, products) => {
    dispatcher(addPageToProducts({key: nroPag, products: products}));
  }

  const removePageFromProductsPage = (key) => {
    dispatcher(removeProductKey(key));
  }

  const updateIsDataLoading = (value) => {
    dispatcher(setIsDataLoading(value));
  }

//   LO DEMÁS CREATE, UPDAATE, DELETE Debería estar en el Tablacontext porque eso se hace en la parte de admin nomas
  return { updateProducts,resetProductsPages,addNewPageToProductsPages,removePageFromProductsPage,updateIsDataLoading }
}