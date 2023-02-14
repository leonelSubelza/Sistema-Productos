import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from "../src/router/Root"
import App from './App';
import PantallaGestionProductos from './components/gestion-productos/PantallaGestionProductos'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path='/' element={<PantallaGestionProductos />} />
          <Route path='/gestionar-productos' element={<PantallaGestionProductos />} />
          <Route path='/gestionar-tipo-productos' element={<PantallaGestionProductos />} />


        </Route>
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);
