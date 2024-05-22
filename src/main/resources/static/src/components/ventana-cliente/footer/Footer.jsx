import React from 'react';
import '../../../styles/ventana-cliente/footer.css';

const Footer = () => {
  return (

    <div className='footer'>
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#7f8c8d" }}>
        <section className="d-flex justify-content-between p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
          <div className="me-5">
            <span>Información y contacto de los desarrolladores:</span>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-4">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Desarrollado Por</h6>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <a href="https://giovannisia.github.io/portfolio/">
                <h6 className="text-uppercase link-your-software">Your Software</h6>
                </a>
              </div>
            </div>
          </div>
        </section >
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
          © 2022 Copyright:
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Licencia Creative Commons" style={{ borderWidth: '0' }} src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />Esta obra está bajo una <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Licencia Creative Commons Atribución-NoComercial-SinDerivadas 4.0 Internacional</a>
        </div>
      </footer >
    </div >
  );
}

export default Footer;