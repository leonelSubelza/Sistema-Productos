import CardAdministracion from "./CardAdministracion";
import '../../../styles/ventana-productos/GestionadorObjectosAdministracion.css'
import { IoMdAdd } from "react-icons/io";

export default function GestionadorObjectosAdministracion({show,titulo,objectName, objects
                                                            ,addObject,editObject,removeObject}){

  const handleAdd = () => {
    return addObject();
  }
  const handleEdit = (obj) => {
    return editObject(obj);
  }
  const handleRemove = (obj) => {
    return removeObject(obj);
  }

  return (
    <div className={`gestionador-objetos-administracion-container ${show&&'show'}`}>
      <div className={'gestionador-titulo-container'}>
        <h1>{titulo}</h1>
        <div>
          <button onClick={handleAdd}><IoMdAdd /><p>{objectName}</p></button>
        </div>
      </div>
      <div className={'gestionador-tabla-container'}>
        <div className={'gestionador-tabla-scroll'}>
            {objects &&
              objects.map((obj)=>(
                <CardAdministracion
                  prod={obj}
                  removeObj={handleRemove}
                  editObj={handleEdit}
                />
              ))
            }
        </div>
      </div>
    </div>
  );

}