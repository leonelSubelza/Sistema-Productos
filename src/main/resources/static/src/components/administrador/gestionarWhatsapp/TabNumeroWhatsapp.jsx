import "../../../styles/ventana-productos/Tabla.css";
import { Container, Button, Input } from "reactstrap";
import { FaWhatsapp, FaPlusCircle } from "react-icons/fa";
import { useState} from "react";
import Navbar from "../sidebar/NavBar.jsx";
import "../../../styles/ventana-productos/Pantallas.css";
// import {useNavigate} from "react-router";
// import {useSelector} from "react-redux";
import {usePageDetailsActions} from "../../../redux/slices/pageDetails/usePageDetailsActions.js";

const TabNumeroWhatsapp = () => {
  const [number, setNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // const { sesionIniciada } = useContext(funcionesContext);
  // const pageDetails = useSelector(store => store.pageDetails);
  const { updateValuePageDetail } = usePageDetailsActions();

  // const navigate = useNavigate();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Lógica para guardar el número

    //ESTO ES PARA GUARDAR EL VALOR DE PAGE DETAILS EN REDUX. Aca guardar, por ejemplo nroWhatsapp
    updateValuePageDetail("nroWhatsapp","112222")
  };

  const handleDeleteClick = () => {
    setNumber("");
    setIsEditing(false);
  };

/*  useEffect(() => {
    if(!pageDetails.sessionStarted) {
      navigate('/login');
    }
  }, []);*/

  return (
    <div className="contenedor-pantalla-productos">
      <Navbar/>
      {/*<div className={`contenedor-tabla ${show ? "show" : ""}`}>*/}
      <div className={`contenedor-tabla show`}>
        <Container className="contenedor-sin-fondo">
          <div className="contenedor-titulo-tabla">
            <FaWhatsapp style={{height: "100%", width: "4rem"}}/>
            <div className="titulo-tabla">
              <h1>Número de WhatsApp</h1>
              <p>El número al que serán redirigidos los clientes al agregar productos al carrito</p>
            </div>
          </div>
          {!isEditing && (
            <Button color="success" onClick={() => setIsEditing(true)} className="boton-agregar">
              <FaPlusCircle/> Agregar nuevo número
            </Button>
          )}
          <br/>
          <div className="contenedor-input">

            <Input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Ingresa número"
              disabled={!isEditing}
            />
            <Button color="primary" onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Guardar" : "Editar"}
            </Button>
            <Button className="boton-borrar" onClick={handleDeleteClick} disabled={!isEditing}>
              Borrar
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TabNumeroWhatsapp;
