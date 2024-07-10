//Iconos
import { MdLabelImportant } from "react-icons/md";
import { FaTshirt,FaWhatsapp } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {PrivateRoutes, PublicRoutes} from "../../../router/routes.js";

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
    title: 'Numero de Whatsapp',
    path: PrivateRoutes.PAGE_DETAILS,
    icon: <FaWhatsapp />,
    cName: 'nav-text'
  },
  {
    title: 'Salir',
    path: PublicRoutes.LOGIN,
    icon: <FiLogOut/>,
    cName: 'nav-text'
  }
]