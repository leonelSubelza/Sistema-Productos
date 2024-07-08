import CardCategoria from "./CardCategoria.jsx";

import '../../../../styles/ventana-cliente/categorias/Categorias.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import {useSelector} from "react-redux";

export default function CategoriasContainer({ show, handleCategoriaShow }) {
    // const { tiposProductos } = useContext(funcionesContext);

    const tiposProductos = useSelector(store => store.productsType.value);

    // const [indexCategoriaShow, setIndexCategoriaShow] = useState(0);

    const handleCardSet = (tipoProducto) => {
        return handleCategoriaShow(tipoProducto);
    }

    return (
        <>
            <div className={`categorias-container ${show && 'show'}`}>
                <h1 style={{ paddingTop: "60px" }}>Categorías</h1>
                <div className={'card-categoria-container'}>
                    <Swiper
                        slidesPerView={3}
                        grid={{
                          rows: 1,
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
