import {cargarTodosLosObjetos} from "../../../service/GestionProductos.js";
import { setProductsType,resetProductsType} from "./productsTypeSlice.js";
import {useDispatch} from "react-redux";

export const useProductsTypeActions = () => {
  const dispatcher = useDispatch();

  const updateProductsType = (newProductsType) => {
    dispatcher(setProductsType(newProductsType));
  }

  const resetProductsTypeSlice = () => {
    dispatcher(resetProductsType());
  }

  return { updateProductsType,resetProductsTypeSlice };
}