import {useDispatch} from "react-redux";
import {
  setFilteredProductsSlice,
  addPageToFilteredProductSlice,
  removePageToFilteredProductSlice,
  resetFilteredProductSlice
} from './filteredProductsSlice.js'

export const useFilteredProductsActions = () => {
  const dispatcher = useDispatch();

  const setFilteredProductsByType = (filteredProducts) => {
    dispatcher(setFilteredProductsSlice(filteredProducts));
  }

  // keyValues = {id: 0, nombre: '', totalPag: 0}
  const addPageToFilteredProductByType = (keyValues, nroPag, pageToSave) => {
    const values = {
      id:keyValues.id,
      nombre:keyValues.nombre,
      totalPag: keyValues.totalPag,
      pageToSave:pageToSave,
      nroPag: nroPag
    }
    dispatcher(addPageToFilteredProductSlice(values));
  }

  const removePageToFilteredProductByType = (indexProductTypeFiltered, nroPag) => {
    dispatcher(removePageToFilteredProductSlice(indexProductTypeFiltered, nroPag))
  }

  const resetFilteredPagesByType = () => {
    dispatcher(resetFilteredProductSlice());
  }

  return {
    setFilteredProductsByType,
    addPageToFilteredProductByType,
    removePageToFilteredProductByType,
    resetFilteredPagesByType
  }
}