import React, {useEffect, useState} from "react";
import "./Hero.css";
import {useSelector} from "react-redux";

const DEFAULT_TITLE_MESSAGE = 'Tus productos a la vista';
const DEFAULT_SUBTITLE_MESSAGE = ' ¡Bienvenidos! Aqui podran subir sus productos para ser mostrador al publico.'

const Inicio = () => {
  const pageDetails = useSelector((store) => store.pageDetails);
  const [pageTitle, setPageTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    if(!pageDetails.title || pageDetails.title==='') {
      setPageTitle(DEFAULT_TITLE_MESSAGE);
    }else{
      setPageTitle(pageDetails.title);
    }
    if(!pageDetails.descriptionTitle || pageDetails.descriptionTitle==='') {
      setSubtitle(DEFAULT_SUBTITLE_MESSAGE);
    }else{
      setSubtitle(pageDetails.descriptionTitle);
    }
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>{pageTitle}</h1>
        <p>
          {subtitle}
        </p>
        <a href="#producto-link">
        <button>Catálogo</button>
        </a>
      </div>
    </div>
  );
};

export default Inicio;
