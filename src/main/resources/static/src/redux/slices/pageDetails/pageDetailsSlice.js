import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  tituloPagina: '',
  descripcionPagina: '',
  imagenPortada: '',
  //solo de la pag
  paginaActual: 0,
  sessionStarted: false,
  nroWhatsapp: '',
  loading: true,
  loadingMessage: ''
}

export const pageDetailsSlice = createSlice({
  name: 'pageDetails',
  initialState: INITIAL_STATE,
  reducers: {
    modifyPageDetails: (state, action) => {
      return action.payload;
    },
    resetPageDetailsReducer: () => {
      return INITIAL_STATE;
    },
    setLoadingPageDetails: (state, action) => {
      const {value,message} = action.payload;
      state.loading = value;
      state.loadingMessage = message;
    },
    updateValueSlice: (state, action) => {
      const {name, value} = action.payload;
      // if (state.hasOwnProperty(name)) {
        state[name] = value;
      // } else {
      //   console.warn(`Property ${name} does not exist in the state.`);
      // }
    }
  }
})

export const {
  modifyPageDetails,
  resetPageDetailsReducer,
  setLoadingPageDetails,
  updateValueSlice
} = pageDetailsSlice.actions;
