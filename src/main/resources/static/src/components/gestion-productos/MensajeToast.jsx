import React from "react";
import Toast from "react-bootstrap/Toast";

import '../../styles/toast.css'
//onClose={() => setShow(false)} show={show}
//delay={10000} autohide

const MensajeToast = ({show,msjBody,color,dispose}) => {
  return (
    <div className='toast-contenedor'>
        <Toast
          className="d-inline-block m-1"
          show={show} onClose={() => dispose({show,msjBody,color})}
        >
          <Toast.Header style = { {background: color, color:'white'}}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""              
            />
            <div className="me-auto">
            &#9888; {msjBody}
            </div>
            
          </Toast.Header>
        </Toast>
    </div>
  );
};
export default MensajeToast;
