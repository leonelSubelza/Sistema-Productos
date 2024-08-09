import { setProductsType,resetProductsTypeSlice} from "./productsTypeSlice.js";
import {useDispatch} from "react-redux";

export const useProductsTypeActions = () => {
  const dispatcher = useDispatch();

  const updateProductsType = (newProductsType) => {
    dispatcher(setProductsType(newProductsType));
  }

  const resetProductsType = () => {
    dispatcher(resetProductsTypeSlice());
  }

  return { updateProductsType,resetProductsType };
}