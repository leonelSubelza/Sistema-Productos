import CardCategoria from "./CardCategoria.jsx";

import './Categorias.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from "react-redux";
export default function CategoriasContainer({ show, handleCategoriaShow }) {
    // const { tiposProductos } = useContext(funcionesContext);

    const tiposProductos = useSelector(store => store.productsType.value);
    // const tiposProductos = [
    //     {
    //         "id": 1,
    //         "nombre": "REMERA PARA PUTITAS BARATAS"
    //     },
    //     {
    //         "id": 2,
    //         "nombre": "REMERA"
    //     },
    //     {
    //         "id": 3,
    //         "nombre": "PANTALON"
    //     },
    //     {
    //         "id": 4,
    //         "nombre": "ZAPATILLAS"
    //     },
    //     {
    //         "id": 5,
    //         "nombre": "REMERA XD"
    //     },
    //     {
    //         "id": 6,
    //         "nombre": "REMERA WORLD"
    //     },
    //     {
    //         "id": 7,
    //         "nombre": "REMERA FOX SPORTS PLAY +"
    //     },
    //     {
    //         "id": 8,
    //         "nombre": "REMERA LIGTH"
    //     }
    // ]

    const handleCardSet = (tipoProducto) => {
        return handleCategoriaShow(tipoProducto);
    }

    return (
      <>
          <div className={`categorias-container ${show && 'show'}`}>
              <div className={'categorias-titulo-container'}><h1>Categorías</h1></div>
              <div className={'card-categoria-container'}>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                      {tiposProductos && tiposProductos.map((tipoProducto) => (
                        <SwiperSlide key={uuidv4()}>
                            <CardCategoria
                              // show={indexCategoriaShow === tipoProducto.id}
                              handleCardSet={() => handleCardSet(tipoProducto)}
                              tipoProducto={tipoProducto}
                            />
                        </SwiperSlide>
                      ))}
                  </Swiper>
              </div>
          </div>
      </>
    );
}