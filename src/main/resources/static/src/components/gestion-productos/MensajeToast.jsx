import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

import ToastContainer from "react-bootstrap/ToastContainer";

//onClose={() => setShow(false)} show={show}

const MensajeToast = ({ color, msjHeader, msjBody }) => {
    const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'fixed', top:'10px', right:'5px', widht:'auto'}}>
        <Toast
          className="d-inline-block m-1"
          bg={color.toLowerCase()}
          show={show} onClose={() => setShow(!show)}
        >
          <Toast.Header style={{ background: '#dc1717', color:'white'}}>
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
