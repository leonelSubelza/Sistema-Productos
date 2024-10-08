import { Table, Container } from "reactstrap";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";

import './Tabla.css'

const TablaAdministrador = ({show,titleIcon,title,description,addObject,editObject,removeObject,
                            textButtonAdd, columnNames, objects,objectTD}) => {

    const handleAddButton = () => {
        return addObject();
    }

    const handleEditObject = (obj) => {
        return editObject(obj);
    }

    const handleRemoveObject = (obj) => {
        return removeObject(obj);
    }

    const getTableData = (obj) => {
        return objectTD(obj);
    }

  return (
    <div className={`contenedor-tabla ${show && 'show'}`}>
    <Container>
      <div className="contenedor-titulo-tabla">
        {titleIcon}
        <div className="titulo-tabla">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className={'contenedor-button'}>
        <button
          className={"boton-agregar"}
          onClick={() => handleAddButton()}
        >
          <p>{`${textButtonAdd} `}</p>
          <IoAddCircleOutline
            style={{width: "25px", height: "25px", margin: "0 0 0 5px"}}
          />
        </button>
      </div>
      <div className={"contenedor-table"}>
        <Table>
          <thead>
          <tr>
            <th>
              <AiOutlineNumber/>
            </th>
            {columnNames.map((name,i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {
            objects && objects
              .map((obj, index) => (
                <tr key={index}>
                  {getTableData(obj)}
                  <td className={"table-data"}>
                    <div className={"table-data-buttons-container"}>
                      <button
                        style={{color: "#060b26"}}
                        className={"table-data-button"}
                        onClick={() =>
                          handleEditObject(obj)
                        }
                      >
                        <AiFillEdit/>
                      </button>{" "}
                      <button
                        className={"table-data-button"}
                        style={{color: "red"}}
                        color="danger"
                        onClick={() => handleRemoveObject(obj)}
                      >
                        <BsTrash/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </Table>
      </div>
    </Container>
    </div>
  );
}
export default TablaAdministrador;