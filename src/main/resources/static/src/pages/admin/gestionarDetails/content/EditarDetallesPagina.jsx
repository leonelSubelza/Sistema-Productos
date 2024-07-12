import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { usePageDetailsActions } from "../../../../redux/slices/pageDetails/usePageDetailsActions.js";
import { guardarPageDetail } from "../../../../service/pageDetailsService.js";
import EditableField from "./EditableField.jsx";
import {IMAGES_URL_PAGEDETAILS} from "../../../../service/Configuracion.js";

const EditarDetallesPagina = () => {
    const { updateValuePageDetail } = usePageDetailsActions();
    const pageDetails = useSelector((store) => store.pageDetails);
    const navigate = useNavigate();
    const [previewDetails, setPreviewDetails] = useState(pageDetails);
    const [URL_IMG,setURL_IMG] = useState();


    const handleSave = async (field, value, imgArchivo) => {
        const pageDetailsObj = {
            ...pageDetails,
            [field]: value,
        };
        await guardarPageDetail(pageDetailsObj, imgArchivo);

        updateValuePageDetail(field, value);
        setPreviewDetails({ ...previewDetails, [field]: value });
    };

    useEffect(() => {
        if (!pageDetails.sessionStarted) {
            navigate("/login");
        }
    }, [navigate, pageDetails.sessionStarted]);

    useEffect(() => {
        setURL_IMG(`${IMAGES_URL_PAGEDETAILS}${pageDetails.frontPageImage}?timestamp=${new Date().getTime()}`)
    }, [pageDetails,previewDetails]);

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
                label="Descripción"
                value={pageDetails.description}
                onSave={(value) => handleSave("description", value)}
                inputType="textarea"
            />
            <EditableField
                label="Imagen de portada"
                value={pageDetails.frontPageImage}
                onSave={(value, imgArchivo) => handleSave("frontPageImage", value, imgArchivo)}
                inputType="file"
            />
        </>
    );
};

export default EditarDetallesPagina;
