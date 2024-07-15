import React from "react";
import "./Hero.css";
import {useSelector} from "react-redux";



const Inicio = () => {
  const pageDetails = useSelector((store) => store.pageDetails);
  // const [previewDetails, setPreviewDetails] = useState(pageDetails);
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>{pageDetails.title}</h1>
        <p>
          {pageDetails.descriptionTitle}
        </p>
        <a href="#producto-link">
        <button>Catálogo</button>
        </a>
      </div>
    </div>
  );
};

export default Inicio;
