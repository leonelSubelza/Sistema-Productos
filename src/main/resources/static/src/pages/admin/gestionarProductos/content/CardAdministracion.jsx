import {useEffect, useState} from "react";
import {IMAGES_URL} from "../../../../service/Configuracion.js";
import './GestionadorObjectosAdministracion.css'
import { IoClose } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { IoMaleFemale } from "react-icons/io5";
import { AiFillDollarCircle } from "react-icons/ai";

export default function CardAdministracion({prod,removeObj,editObj}){
  const [urlImg, setUrlImg] = useState('')

  const handleDelete = () => {
    return removeObj(prod);
  }

  const handleEdit = () => {
    return editObj(prod);
  }

  useEffect(() => {
    setUrlImg(`${IMAGES_URL}${prod.imagen}?timestamp=${new Date().getTime()}`)
  }, []);

  return (
      <div className={'card-administracion-container'}>
        <div className={'card-administracion-img-container'} onClick={handleEdit}>
          <div className={'card-administracion-img'}>
            <img src={urlImg} alt="foto-del-producto"/>
          </div>
        </div>
        <div className={'card-administracion-elements-container'} onClick={handleEdit}>
          <div className={'card-administracion-elements-nombre-descripcion'}>
            <h1>{prod.nombre}</h1>
            <p>{prod.descripcion}</p>
          </div>
          <div className={'card-administracion-elements-info'} onClick={handleEdit}>
            <div><GiClothes /> <p>{prod.tipoProducto.nombre}</p></div>
            <div><IoMaleFemale /> <p>{prod.genero}</p></div>
            <div className={'card-administracion-elements-info-dolar'}><AiFillDollarCircle /> <p>{prod.precio}</p></div>
          </div>
        </div>
        <div className={'card-administracion-closeBtn-container'}>
          <div className={'card-administracion-closeBtn'}>
            <button onClick={handleDelete}>
              <IoClose />
            </button>
          </div>
        </div>
      </div>
    );
}