import {useDispatch} from "react-redux";
import {
  setFilteredProductsByTypeSlice,
  addPageToFilteredProductByTypeSlice,
  removePageToFilteredProductByTypeSlice,
  resetFilteredProductByTypeSlice
} from './filteredProductsSlice.js'

export const useFilteredProductsActions = () => {
  const dispatcher = useDispatch();

  const setFilteredProductsByType = (filteredProducts) => {
    dispatcher(setFilteredProductsByTypeSlice(filteredProducts));
  }

  const addPageToFilteredProductByType = (keyValues, nroPag, pageToSave) => {
    dispatcher(addPageToFilteredProductByTypeSlice(keyValues, nroPag, pageToSave));
  }

  const removePageToFilteredProductByType = (indexProductTypeFiltered, nroPag) => {
    dispatcher(removePageToFilteredProductByTypeSlice(indexProductTypeFiltered, nroPag))
  }

  const resetFilteredPagesByType = () => {
    dispatcher(resetFilteredProductByTypeSlice());
  }

  return {
    setFilteredProductsByType,
    addPageToFilteredProductByType,
    removePageToFilteredProductByType,
    resetFilteredPagesByType
  }
}