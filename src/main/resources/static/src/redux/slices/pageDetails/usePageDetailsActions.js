import {useDispatch} from "react-redux";
import {modifyPageDetails,resetPageDetailsReducer,setLoadingPageDetails,updateValueSlice} from "./pageDetailsSlice.js";

export const usePageDetailsActions = () => {
  const dispatcher = useDispatch();

  const setPageDetails = (newPageDetails) => {
      dispatcher(modifyPageDetails(newPageDetails));
  }

  const resetPageDetails = () => {
    dispatcher(resetPageDetailsReducer());
  }

  const updateLoadingPageDetails = (value,message) => {
    dispatcher(setLoadingPageDetails({value: value,message: message}));
  }

  const updateValuePageDetail = (name,value) => {
    dispatcher(updateValueSlice({name:name,value:value}));
  }

  return { setPageDetails,resetPageDetails,updateLoadingPageDetails,updateValuePageDetail };
}