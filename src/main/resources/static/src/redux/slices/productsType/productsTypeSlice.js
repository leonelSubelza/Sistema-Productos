import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  value: [],
  loading: false,
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
    },
    setIsDataLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const { setProductsType,resetProductsTypeSlice,setIsDataLoading } = productsTypeSlice.actions;