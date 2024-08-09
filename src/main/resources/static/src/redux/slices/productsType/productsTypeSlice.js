import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  value: [],
}

export const productsTypeSlice = createSlice({
  name: 'productsType',
  initialState: INITIAL_STATE,
  reducers: {
    setProductsType: (state, action) => {
      state.value = action.payload;
    },
    resetProductsTypeSlice: () => {
      return INITIAL_STATE;
    }
  }
})

export const { setProductsType,resetProductsTypeSlice } = productsTypeSlice.actions;