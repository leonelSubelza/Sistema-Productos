import React,{useContext} from "react";
import Toast from "react-bootstrap/Toast";

import './toast.css'
import { CgDanger } from "react-icons/cg";

import { funcionesContext } from '../../context/FuncionesTablaContext.jsx';
//onClose={() => setShow(false)} show={show}
//delay={10000} autohide

/*
        show={toast.show}
        msjBody={toast.msjBody}
        color={toast.color}
        dispose={(prev) =>
          setToast({ show: false, msjBody: prev.msjBody, color: prev.color })
        }
*/

const MensajeToast = () => {
  const { toast,setToast } = useContext(funcionesContext);

  return (
    <div className='toast-contenedor'>
        <Toast
          className="d-inline-block m-1"
          show={toast.show} onClose={() => setToast({show: false, msjBody: "",color: "#dc1717"})}
        >
          <Toast.Header style = { {background: toast.color, color:'white'}}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""              
            />
            <div className="me-auto" >
            {/*&#9888;*/}<CgDanger style={{width:'25px', height:'25px'}}/> {toast.msjBody}
            </div>
            
          </Toast.Header>
        </Toast>
    </div>
  );
};
export default MensajeToast;
