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
                <h6 className="text-uppercase fw-bold">Tienda Humilde</h6>
                <hr
                  className="mb-4 mt-6 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  Una tienda donde el dueño de la tienda puede agregar productos y venderlos a través
                  del contacto directo con el vendedor.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Giovanni Sia</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <a href="#!" className="text-white me-4">
                    <i class="bi bi-linkedin"></i> Linkedln
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white me-4">
                    <i class="bi bi-github"></i> Github
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Leonel subelza</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <a href="#!" className="text-white me-4">
                    <i class="bi bi-linkedin"></i> Linkedln
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white me-4">
                    <i class="bi bi-github"></i> Github
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section >
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} >
          © 2022 Copyright:
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Licencia Creative Commons" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a>
        </div>
      </footer >
    </div >
  );
}

export default Footer;