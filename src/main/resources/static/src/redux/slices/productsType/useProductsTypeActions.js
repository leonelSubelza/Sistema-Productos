import {cargarTodosLosObjetos} from "../../../service/GestionProductos.js";
import { setProductsType,resetProductsTypeSlice,setIsDataLoading} from "./productsTypeSlice.js";
import {useDispatch} from "react-redux";

export const useProductsTypeActions = () => {
  const dispatcher = useDispatch();

  const updateProductsType = (newProductsType) => {
    dispatcher(setProductsType(newProductsType));
  }

  const resetProductsType = () => {
    dispatcher(resetProductsTypeSlice());
  }

  const updateProductTypeIsDataLoading = (value) => {
    dispatcher(setIsDataLoading(value));
  }

  return { updateProductsType,resetProductsType,updateProductTypeIsDataLoading };
}