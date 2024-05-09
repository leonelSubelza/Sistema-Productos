//Iconos
import { MdLabelImportant } from "react-icons/md";
import { FaTshirt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const SideBarData = [
  {
    title: 'Productos',
    path: '/administrador',
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
    title: 'Salir',
    path: '/',
    icon: <FiLogOut/>,
    cName: 'nav-text'
  }
]