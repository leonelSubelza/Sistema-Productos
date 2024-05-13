import { Table, Button, Container } from "reactstrap";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import {useEffect, useState} from "react";

import '../../styles/ventana-productos/Tabla.css'

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
    <Container className={`contenedor-tabla ${show && 'show'}`}>
      <div className="contenedor-titulo-tabla">
        {/*<GiClothes style={{ height: "100%", width: "4rem" }} />*/}
        {titleIcon}
        <div className="titulo-tabla">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <Button
        color="success"
        className={"boton-agregar"}
        onClick={() => handleAddButton()}
        style={{display: "flex"}}
      >
        {`${textButtonAdd} `}
        <IoAddCircleOutline
          style={{width: "25px", height: "25px", margin: "0 0 0 5px"}}
        />
      </Button>
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
  );
}
export default TablaAdministrador;