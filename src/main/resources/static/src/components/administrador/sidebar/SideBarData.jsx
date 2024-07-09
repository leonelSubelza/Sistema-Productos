//Iconos
import { MdLabelImportant } from "react-icons/md";
import { FaTshirt} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {GoGear} from "react-icons/all.js";

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
    title: 'Configuración',
    path: '/administrador/configuracion',
    icon: <GoGear />,
    cName: 'nav-text'
  },
  {
    title: 'Salir',
    path: '/login',
    icon: <FiLogOut/>,
    cName: 'nav-text'
  }
]