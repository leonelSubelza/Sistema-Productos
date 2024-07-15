import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { usePageDetailsActions } from "../../../../redux/slices/pageDetails/usePageDetailsActions.js";
import { guardarPageDetail } from "../../../../service/pageDetailsService.js";
import EditableField from "./EditableField.jsx";
// import {IMAGES_URL_PAGEDETAILS} from "../../../../service/Configuracion.js";

const EditarDetallesPagina = () => {
    const { updateValuePageDetail } = usePageDetailsActions();
    const pageDetails = useSelector((store) => store.pageDetails);
    const navigate = useNavigate();
    const [previewDetails, setPreviewDetails] = useState(pageDetails);
    // const [URL_IMG,setURL_IMG] = useState('');


    const handleSave = async (field, value, imgArchivo) => {
        try{
            const pageDetailsObj = {
                ...pageDetails,
                [field]: value,
            };
            const response = await guardarPageDetail(pageDetailsObj,field, imgArchivo);
            console.log(response)

            updateValuePageDetail(field, value);
            setPreviewDetails({ ...previewDetails, [field]: value });
        } catch(e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (!pageDetails.sessionStarted) {
            navigate("/login");
        }
    }, [navigate, pageDetails.sessionStarted]);

/*    useEffect(() => {
        setURL_IMG(`${IMAGES_URL_PAGEDETAILS}${pageDetails.frontPageImage}?timestamp=${new Date().getTime()}`)
    }, [pageDetails,previewDetails]);*/

    return (
      <>
        <div className="contenedor-titulo-tabla">
          <FaEdit style={{height: "100%", width: "4rem"}}/>
          <div className="titulo-tabla">
            <h1>Editar Detalles de la Página</h1>
            <p>Modifique los detalles importantes de su página desde aquí</p>
          </div>
        </div>
        <EditableField
          label="Número de WhatsApp"
          value={pageDetails.nroWhatsapp}
          onSave={(value) => handleSave("nroWhatsapp", value)}
        />
        <EditableField
          label="Título"
          value={pageDetails.title}
          onSave={(value) => handleSave("title", value)}
        />
        <EditableField
          label="Subtítulo"
          value={pageDetails.descriptionTitle}
          onSave={(value) => handleSave("descriptionTitle", value)}
          inputType="textarea"
        />
        <EditableField
          label="Descripción de la página"
          value={pageDetails.pageDescription}
          onSave={(value) => handleSave("pageDescription", value)}
        />
        <EditableField
          label="Imagen de portada"
          value={pageDetails.frontPageImage}
          onSave={(value, imgArchivo) => handleSave("frontPageImage", value, imgArchivo)}
          inputType="file"
        />
        <EditableField
          label="Logo de la página"
          value={pageDetails.pageLogo}
          onSave={(value, imgArchivo) => handleSave("pageLogoImage", value, imgArchivo)}
          inputType="file"
        />
      </>
    );
};

export default EditarDetallesPagina;
