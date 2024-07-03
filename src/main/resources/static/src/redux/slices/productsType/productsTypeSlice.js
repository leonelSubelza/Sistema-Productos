import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  value: [],
}

export const productsTypeSlice = createSlice({
  name: 'productsType',
  initialState: INITIAL_STATE,
  reducers: {
    setProductsType: (state, action) => {
      console.log("se agrega productsType:")
      console.log(action.payload)
      state.value = action.payload;
    },
    resetProductsTypeSlice: () => {
      return INITIAL_STATE;
    }
  }
})

export const { setProductsType,resetProductsTypeSlice } = productsTypeSlice.actions;