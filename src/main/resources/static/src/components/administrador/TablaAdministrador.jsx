import { Table, Button, Container } from "reactstrap";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import {useEffect, useState} from "react";

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
          <br />
          <Button
              color="success"
              onClick={()=>handleAddButton()}
              style={{ display: "flex" }}
          >
              {`${textButtonAdd} `}
              <IoAddCircleOutline
                  style={{ width: "25px", height: "25px", margin: "0 0 0 5px" }}
              />
          </Button>
          <br />
          <br />
          <div style={{ overflow: "auto", height: "340px" }}>
              <Table>
                  <thead style={{ background: "#e5e5e5" }}>
                  <tr>
                      <th>
                          <AiOutlineNumber />
                      </th>
                      {columnNames.map((name) => (
                          <th>{name}</th>
                      ))}
                  </tr>
                  </thead>
                  <tbody>
                  {
                      objects && objects
                          .map((obj, index) => (
                              <tr key={index}>
                                {getTableData(obj)}
                                  <td>
                                      <Button
                                          color="primary"
                                          onClick={() =>
                                              handleEditObject(obj)
                                          }
                                      >
                                          <AiFillEdit />
                                      </Button>{" "}
                                      <Button
                                          color="danger"
                                          onClick={() => handleRemoveObject(obj)}
                                      >
                                          <BsTrash />
                                      </Button>
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