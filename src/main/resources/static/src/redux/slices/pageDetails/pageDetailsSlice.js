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
      state.loading = action.payload;
    }

  }
})

export const { modifyPageDetails,resetPageDetailsReducer,setLoadingPageDetails } = pageDetailsSlice.actions;
