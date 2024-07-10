//Iconos
import { MdLabelImportant } from "react-icons/md";
import { FaTshirt} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {PrivateRoutes, PublicRoutes} from "../../../router/routes.js";
import {GoGear} from "react-icons/all.js";

export const SideBarData = [
  {
    title: 'Productos',
    path: PrivateRoutes.PRODUCTS,
    icon: <FaTshirt />,
    cName: 'nav-text'
  },
  {
    title: 'Tipos de Productos',
    path: PrivateRoutes.PRODUCT_TYPES,
    icon: <MdLabelImportant />,
    cName: 'nav-text'
  },
  {

    title: 'Configuración',
    path: PrivateRoutes.PAGE_DETAILS,
    icon: <GoGear />,
    cName: 'nav-text'
  },
  {
    title: 'Salir',
    path: PublicRoutes.LOGIN,
    icon: <FiLogOut/>,
    cName: 'nav-text'
  }
]