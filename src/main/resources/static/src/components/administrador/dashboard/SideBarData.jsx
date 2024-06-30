//Iconos
import { MdLabelImportant } from "react-icons/md";
import { FaTshirt,FaWhatsapp } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const SideBarData = [
  {
    title: 'Productos',
    path: '/administrador/productos',
    icon: <FaTshirt />,
    cName: 'nav-text'
  },
  {
    title: 'Tipos de Productos',
    path: '/administrador/tablaTipoProductos',
    icon: <MdLabelImportant />,
    cName: 'nav-text'
  },
  {
    title: 'Numero de Whatsapp',
    path: '/administrador/NumeroWhatsapp',
    icon: <FaWhatsapp />,
    cName: 'nav-text'
  },
  {
    title: 'Salir',
    path: '/login',
    icon: <FiLogOut/>,
    cName: 'nav-text'
  }
]