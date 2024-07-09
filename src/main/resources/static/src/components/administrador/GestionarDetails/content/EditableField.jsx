import { useState } from "react";
import { Button, Input } from "reactstrap";

const EditableField = ({ label, value, onSave, inputType = "text" }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        onSave(inputValue, inputType === "file" ? imageFile : undefined); // Pasar tanto el valor como el archivo de imagen
    };

    const handleDeleteClick = () => {
        setInputValue("");
        setImageFile(null);
        setIsEditing(false);
        onSave("");
    };

    const handleInputChange = (e) => {
        if (inputType === "file") {
            const file = e.target.files[0];
            setImageFile(file); // Almacenar el archivo de imagen
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setInputValue(reader.result); // Establecer la vista previa de la imagen
                };
                reader.readAsDataURL(file);
            }
        } else {
            setInputValue(e.target.value);
        }
    };

    return (
        <div className="contenedor-seccion">
            <h2>{label}</h2>
            <div className="contenedor-input">
                {inputType === "file" && inputValue ? (
                    <img
                        src={inputValue}
                        alt="Preview"
                        onClick={() => document.getElementById(`fileInput-${label}`).click()}
                        style={{ cursor: "pointer", width: "200px", height: "auto" }}
                    />
                ) : (
                    <Input
                        type={inputType}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={`Ingresa ${label.toLowerCase()}`}
                        disabled={!isEditing}
                    />
                )}
                {isEditing && inputType === "file" && (
                    <input
                        id={`fileInput-${label}`}
                        type="file"
                        onChange={handleInputChange}
                        style={{ display: "none" }}
                    />
                )}
                <Button color="primary" onClick={isEditing ? handleSaveClick : handleEditClick}>
                    {isEditing ? "Guardar" : "Editar"}
                </Button>
                <Button className="boton-borrar" onClick={handleDeleteClick} disabled={!isEditing}>
                    Borrar
                </Button>
            </div>
        </div>
    );
};

export default EditableField;
