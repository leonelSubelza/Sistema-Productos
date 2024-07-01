import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  productsType: [],
  loading: false,
}

export const productsTypeSlice = createSlice({
  name: 'productsType',
  initialState: [],
  reducers: {
    setProductsType: (state, action) => {
      return action.payload ;
    },
    resetProductsType: () => {
      return INITIAL_STATE;
    }
  }
})

export const { setProductsType,resetProductsType } = productsTypeSlice.actions;