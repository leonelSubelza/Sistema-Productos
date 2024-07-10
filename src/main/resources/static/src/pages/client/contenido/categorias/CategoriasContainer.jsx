import CardCategoria from "./CardCategoria.jsx";

import './Categorias.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function CategoriasContainer({ show, handleCategoriaShow }) {
    // const { tiposProductos } = useContext(funcionesContext);

    const tiposProductos = useSelector(store => store.productsType.value);
    const [rows, setRows] = useState(1)

    // const [indexCategoriaShow, setIndexCategoriaShow] = useState(0);

    const handleCardSet = (tipoProducto) => {
        return handleCategoriaShow(tipoProducto);
    }

    useEffect(() => {
        if(tiposProductos.length>=4){
            setRows(2);
        }else{
            setRows(1);
        }
    }, [tiposProductos]);

    return (
        <>
            <div className={`categorias-container ${show && 'show'}`}>
                <div className={'categorias-titulo-container'}><h1>Categorías</h1></div>
                <div className={'card-categoria-container'}>
                    <Swiper
                        slidesPerView={3}
                        grid={{
                          rows: rows,
                        }}
                        spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            700: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Grid, Pagination]}
                        className="mySwiper"
                    >
                        {/*{tiposProductos && tiposProductos.length>0 &&*/}
                        {tiposProductos.map((tipoProducto, index) => (
                            <SwiperSlide key={index}>
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
