import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  pageName:'',
  pageSlogan:'',
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

// HACER QUE LA LLAMADA A LA API SE HAGA POR ID Y FIJARSE QUE PASA SI  SE HACE UNA LLAMADA PARA CARGAR LOS PAGE DETAILS POR PRIMERA VEZ Y NO EXISTEN LOS DATOS

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
