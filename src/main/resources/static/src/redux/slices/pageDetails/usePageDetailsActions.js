import {useDispatch} from "react-redux";
import {modifyPageDetails,resetPageDetailsReducer,setLoadingPageDetails} from "./pageDetailsSlice.js";

export const usePageDetailsActions = () => {
  const dispatcher = useDispatch();

  const setPageDetails = (newPageDetails) => {
      dispatcher(modifyPageDetails(newPageDetails));
  }

  const resetPageDetails = () => {
    dispatcher(resetPageDetailsReducer());
  }

  const updateLoadingPageDetails = (value) => {
    dispatcher(setLoadingPageDetails(value));
  }

  return { setPageDetails,resetPageDetails,updateLoadingPageDetails };
}