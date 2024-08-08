import React, {useEffect, useState} from "react";
import "./nosotros.css";
import {useNavigate} from "react-router";
import {PublicRoutes} from "../../../router/routes.js";
import {useSelector} from "react-redux";

const DEFAULT_ABOUT_US_TEXT = 'En Tienda Humilde nos centramos en ofrecer a nuestros clientes que puedan vender sus productos de la forma más humilde posible.'

const Nosotros = () => {
  const navigate = useNavigate();
  const pageDetails = useSelector((store) => store.pageDetails);
  const [description, setDescription] = useState('');

  const handleUnirse = () => {
    navigate(PublicRoutes.LOGIN)
  }

  useEffect(() => {
    if(!pageDetails.pageDescription || pageDetails.pageDescription === '') {
      setDescription(DEFAULT_ABOUT_US_TEXT);
    }else{
      setDescription(pageDetails.pageDescription);
    }
  }, []);

  return (
    <div id="nosotros-link" className="nosotros">
      <h1>Nosotros</h1>
      <p>
        {description}
      </p>
      <a>
      <button onClick={handleUnirse}>Unirse</button>
      </a>
    </div>
  );
};

export default Nosotros;
