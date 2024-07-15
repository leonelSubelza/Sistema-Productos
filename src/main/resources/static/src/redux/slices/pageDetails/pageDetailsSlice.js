import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  title: '',
  descriptionTitle: '',
  pageLogo: '',
  frontPageImage: '',
  nroWhatsapp: '',
  pageDescription: '',
  //solo de la pag
  paginaActual: 0,
  sessionStarted: false,
  loading: true,
  loadingMessage: ''
}

export const pageDetailsSlice = createSlice({
  name: 'pageDetails',
  initialState: INITIAL_STATE,
  reducers: {
    modifyPageDetails: (state, action) => {
      return {...state, ...action.payload}
    },
    resetPageDetailsReducer: () => INITIAL_STATE,
    setLoadingPageDetails: (state, action) => {
      const {value,message} = action.payload;
      state.loading = value;
      state.loadingMessage = message;

      // toma los valores previos y los reemplaza por los nuevos si son distintos
      // return { ...state, ...action.payload}
    },
    updateValueSlice: (state, action) => {
      const {name, value} = action.payload;
        state[name] = value;
    }
  }
})

export const {
  modifyPageDetails,
  resetPageDetailsReducer,
  setLoadingPageDetails,
  updateValueSlice
} = pageDetailsSlice.actions;
